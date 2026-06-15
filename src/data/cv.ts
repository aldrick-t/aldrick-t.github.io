import manifest from '../../cv/manifest.json';

export interface CvVariant {
  id: 'engineering' | 'academic' | 'full';
  label: string;
  entryTypst: string;
  outputPdf: string;
  publicPath: string;
  available: boolean;
  default?: boolean;
}

export const cvVariants = manifest as CvVariant[];
export const defaultCvVariant =
  cvVariants.find((variant) => variant.default) ?? cvVariants[0];

export const getCvVariantById = (id: string | null | undefined) =>
  cvVariants.find((variant) => variant.id === id);
