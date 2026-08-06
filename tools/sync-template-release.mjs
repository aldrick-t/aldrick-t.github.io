import { cpSync, existsSync, lstatSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import os from 'node:os';
import path from 'node:path';

const [tag, ...flags] = process.argv.slice(2);
const apply = flags.includes('--apply');
const root = process.cwd();
const lockPath = path.join(root, 'template.lock.json');
const downstreamPolicyPath = path.join(root, '.template-sync.json');
const forbiddenPathPatterns = [
  /^public\/items\//,
  /^public\/cv\//,
  /^cv\/.*\.pdf$/i,
  /^public\/google[^/]*\.html$/i
];
const blockedTerms = [
  ['al', 'drick'].join(''),
  ['ta', 'deo'].join(''),
  ['exa', 'tec'].join(''),
  ['gmail', '.com'].join(''),
  ['tec', '.mx'].join('')
];
const secretPatterns = [
  /(?:sk|rk|pk)_[A-Za-z0-9_-]{20,}/,
  /gh[pousr]_[A-Za-z0-9]{20,}/,
  /github_pat_[A-Za-z0-9_]{20,}/,
  /AKIA[0-9A-Z]{16}/,
  /-----BEGIN [A-Z ]{3,}PRIVATE KEY-----/
];

if (!tag || !/^v\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/.test(tag)) {
  throw new Error('Usage: npm run sync:template -- vX.Y.Z [--apply]');
}

const lock = JSON.parse(readFileSync(lockPath, 'utf8'));
const downstreamPolicy = JSON.parse(readFileSync(downstreamPolicyPath, 'utf8'));
if (downstreamPolicy.mode !== 'release-to-downstream-only') {
  throw new Error('Refusing to run: downstream synchronization must be release-to-downstream-only.');
}
if (!lock.templateRepository?.startsWith('https://github.com/')) {
  throw new Error('template.lock.json must identify an HTTPS GitHub template repository.');
}

const temporaryRoot = mkdtempSync(path.join(os.tmpdir(), 'portfolio-template-sync-'));
const checkout = path.join(temporaryRoot, 'template');

function run(command, args, options = {}) {
  return execFileSync(command, args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], ...options }).trim();
}

function matchesPath(file, pattern) {
  if (pattern.endsWith('/**')) return file.startsWith(pattern.slice(0, -2));
  return file === pattern;
}

function isProtected(file, protectedPaths) {
  return protectedPaths.some((pattern) => matchesPath(file, pattern));
}

function resolveInside(base, file) {
  const resolved = path.resolve(base, file);
  if (!resolved.startsWith(`${base}${path.sep}`)) throw new Error(`Unsafe path outside repository: ${file}`);
  return resolved;
}

function isProbablyText(file) {
  return /\.(astro|css|html|js|json|md|mjs|svg|toml|ts|tsx|txt|typ)$/i.test(file)
    || !path.extname(file);
}

function validateTemplateTree(files, manifest) {
  const errors = [];
  for (const file of files) {
    if (forbiddenPathPatterns.some((pattern) => pattern.test(file))) {
      errors.push(`${file}: forbidden personal-content path`);
      continue;
    }
    const source = resolveInside(checkout, file);
    if (lstatSync(source).isSymbolicLink()) {
      errors.push(`${file}: symlinks are not accepted in a template release`);
      continue;
    }
    if (!isProbablyText(file)) continue;
    const contents = readFileSync(source, 'utf8').toLowerCase();
    for (const term of blockedTerms) {
      if (contents.includes(term) && file !== 'LICENSE') errors.push(`${file}: contains blocked personal identifier`);
    }
    for (const pattern of secretPatterns) {
      if (pattern.test(contents)) errors.push(`${file}: contains a credential-like value`);
    }
  }
  if (manifest.schemaVersion !== 1) errors.push('Unsupported template synchronization manifest version.');
  if (errors.length) throw new Error(`Template release safety check failed:\n- ${errors.join('\n- ')}`);
}

try {
  run('git', ['clone', '--depth', '1', '--branch', tag, lock.templateRepository, checkout]);

  const manifest = JSON.parse(readFileSync(path.join(checkout, downstreamPolicy.manifest), 'utf8'));
  const files = run('git', ['-C', checkout, 'ls-files']).split('\n').filter(Boolean);
  validateTemplateTree(files, manifest);

  const unsupportedPaths = manifest.sharedPaths.filter((pattern) => !downstreamPolicy.allowedSharedPaths.includes(pattern));
  if (unsupportedPaths.length) {
    throw new Error(`Template release requests unsupported shared paths: ${unsupportedPaths.join(', ')}`);
  }

  const sharedFiles = files.filter((file) => downstreamPolicy.allowedSharedPaths.some((pattern) => matchesPath(file, pattern)));
  const blocked = sharedFiles.filter((file) => isProtected(file, downstreamPolicy.protectedPaths));
  if (blocked.length) throw new Error(`Template release attempts to overwrite protected paths: ${blocked.join(', ')}`);

  const changes = sharedFiles.filter((file) => {
    const source = resolveInside(checkout, file);
    const target = resolveInside(root, file);
    if (!existsSync(target)) return true;
    if (lstatSync(target).isSymbolicLink()) throw new Error(`Refusing to write through symlink: ${file}`);
    return !readFileSync(source).equals(readFileSync(target));
  });

  if (!apply) {
    console.log(`Dry run for ${tag}: ${changes.length} shared file(s) would change.`);
    for (const file of changes) console.log(`- ${file}`);
    console.log('Re-run with --apply to copy these files and update template.lock.json.');
    process.exit(0);
  }

  for (const file of changes) {
    const source = resolveInside(checkout, file);
    const target = resolveInside(root, file);
    if (lstatSync(source).isSymbolicLink()) throw new Error(`Refusing to copy symlink from template: ${file}`);
    cpSync(source, target, { force: true, recursive: false });
  }

  lock.version = tag;
  lock.commit = run('git', ['-C', checkout, 'rev-parse', 'HEAD']);
  writeFileSync(lockPath, `${JSON.stringify(lock, null, 2)}\n`);
  console.log(`Applied template release ${tag}: ${changes.length} shared file(s) copied.`);
  console.log('No files were deleted. Review obsolete shared files manually in the update pull request.');
} finally {
  rmSync(temporaryRoot, { recursive: true, force: true });
}

