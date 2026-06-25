import manifest from '../../cv/manifest.json';

export interface CvVariant {
  id: 'engineering' | 'academic' | 'full';
  label: string;
  entryTypst: string;
  outputPdf: string;
  publicPath: string;
  published: boolean;
  default?: boolean;
}

export const cvVariants = manifest as CvVariant[];
export const publishedCvVariants = cvVariants.filter((variant) => variant.published);
export const defaultCvVariant =
  publishedCvVariants.find((variant) => variant.default) ?? publishedCvVariants[0];
