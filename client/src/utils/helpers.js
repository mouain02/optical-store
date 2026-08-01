import storeConfig from "../config/storeConfig";

export const getEffectivePrice = (product) =>
  product.discountPrice > 0 ? product.discountPrice : product.price;

export const calculateLensPrice = (lensType, treatments = []) => {
  const { types, treatments: treatmentPrices } = storeConfig.lensPricing;
  const typePrice = types[lensType] || 0;
  const treatmentTotal = treatments.reduce(
    (sum, t) => sum + (treatmentPrices[t] || 0),
    0
  );
  return typePrice + treatmentTotal;
};

export const formatPrice = (amount, currency = storeConfig.currency) =>
  `${amount.toFixed(0)} ${currency}`;

export const getImageUrl = (imagePath) => {
  if (!imagePath) return "/placeholder-product.svg";
  if (typeof imagePath !== "string") return "/placeholder-product.svg";
  if (/^https?:\/\//i.test(imagePath) || /^data:/i.test(imagePath)) return imagePath;

  const normalized = imagePath.replace(/\\/g, "/").replace(/^\.\//, "").replace(/^server\//, "");
  return normalized.startsWith("/") ? normalized : `/${normalized}`;
};

export default { getEffectivePrice, calculateLensPrice, formatPrice, getImageUrl };
