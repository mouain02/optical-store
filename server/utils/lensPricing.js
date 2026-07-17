import storeConfig from "../config/storeConfig.js";

export const calculateLensPrice = (lensType, treatments = []) => {
  const { types, treatments: treatmentPrices } = storeConfig.lensPricing;
  const typePrice = types[lensType] || 0;
  const treatmentTotal = treatments.reduce(
    (sum, t) => sum + (treatmentPrices[t] || 0),
    0
  );
  return typePrice + treatmentTotal;
};

export const getEffectivePrice = (product) =>
  product.discountPrice > 0 ? product.discountPrice : product.price;

export default { calculateLensPrice, getEffectivePrice };
