export const normalizeImagePath = (imagePath) => {
  if (!imagePath) return "";
  if (/^https?:\/\//i.test(imagePath) || /^data:/i.test(imagePath)) return imagePath;

  const normalized = imagePath.replace(/\\/g, "/");
  const withoutPrefix = normalized.replace(/^\.\//, "").replace(/^server\//, "");

  if (withoutPrefix.startsWith("/")) return withoutPrefix;
  if (withoutPrefix.startsWith("uploads/")) return `/${withoutPrefix}`;

  return `/${withoutPrefix}`;
};
