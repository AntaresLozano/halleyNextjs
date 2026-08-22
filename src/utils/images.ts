export const DEFAULT_IMAGE = "/images/background.jpg";

export function getImageUrl(image?: { url?: string | null } | null): string {
  if (image?.url) {
    return `${process.env.NEXT_PUBLIC_ASSETS}${image.url}`;
  }
  return DEFAULT_IMAGE;
}
