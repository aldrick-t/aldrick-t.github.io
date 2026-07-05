export function getYouTubeEmbedUrl(url: string): string | undefined {
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return undefined;
  }

  const hostname = parsed.hostname.replace(/^www\./, '');
  let videoId: string | undefined;

  if (hostname === 'youtu.be') {
    videoId = parsed.pathname.split('/').filter(Boolean)[0];
  } else if (hostname === 'youtube.com' || hostname === 'm.youtube.com') {
    const [, route, id] = parsed.pathname.split('/');
    if (parsed.pathname === '/watch') videoId = parsed.searchParams.get('v') ?? undefined;
    if (route === 'embed' || route === 'shorts') videoId = id;
  }

  if (!videoId || !/^[A-Za-z0-9_-]{11}$/.test(videoId)) return undefined;
  return `https://www.youtube-nocookie.com/embed/${videoId}`;
}

export function isRemoteUrl(value: string): boolean {
  try {
    const parsed = new URL(value);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

export function isLocalItemPath(value: string): boolean {
  return value.startsWith('/items/');
}

export function getPdfSourceUrl(entry: { path?: string; url?: string }): string | undefined {
  return entry.path ?? entry.url;
}

export function getGeneratedPdfThumbnailPath(itemId: string, pdfPath: string): string {
  const filename = pdfPath.split('/').pop() ?? '';
  const basename = filename.replace(/\.pdf$/i, '');
  return `/items/${itemId}/generated/${basename}-page-1.png`;
}

export function getFileExtensionLabel(filePath: string): string {
  const filename = filePath.split('/').pop() ?? '';
  const extension = filename.includes('.') ? filename.split('.').pop() : undefined;
  return extension ? extension.toUpperCase() : 'FILE';
}

export function getVideoMimeType(videoPath: string): string | undefined {
  const extension = videoPath.split('.').pop()?.toLowerCase();
  if (extension === 'mp4') return 'video/mp4';
  if (extension === 'webm') return 'video/webm';
  return undefined;
}
