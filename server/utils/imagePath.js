export const normalizeImagePath = (imagePath) => {
  if (!imagePath) return "";
  if (/^https?:\/\//i.test(imagePath) || /^data:/i.test(imagePath)) return imagePath;

  const normalized = imagePath.replace(/\\/g, "/");
  const withoutPrefix = normalized.replace(/^\.\//, "").replace(/^\/+/g, "");

  const uploadsIndex = withoutPrefix.toLowerCase().indexOf("/uploads/");
  if (uploadsIndex >= 0) {
    return `/${withoutPrefix.slice(uploadsIndex + 1).replace(/^\/+/, "")}`;
  }

  if (withoutPrefix.startsWith("uploads/")) return `/${withoutPrefix}`;
  if (withoutPrefix.startsWith("server/")) return `/${withoutPrefix.replace(/^server\//, "")}`;

  return `/${withoutPrefix.replace(/^\/+/, "")}`;
};
