import manifest from '../../cv/manifest.json';

export interface CvVariant {
  id: 'engineering' | 'academic' | 'full' | 'shokumu-keirekisho';
  label: string;
  source: 'local' | 'external';
  entryTypst?: string;
  outputPdf: string;
  publicPath: string;
  checksumFile?: string;
  provenanceFile?: string;
  published: boolean;
  default?: boolean;
}

export const cvVariants = manifest as CvVariant[];
export const publishedCvVariants = cvVariants.filter((variant) => variant.published);
export const defaultCvVariant =
  publishedCvVariants.find((variant) => variant.default) ?? publishedCvVariants[0];
