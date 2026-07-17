import storeConfig from "../config/storeConfig.js";
import asyncHandler from "../utils/asyncHandler.js";

export const getStoreConfig = asyncHandler(async (req, res) => {
  res.json(storeConfig);
});

export default { getStoreConfig };
