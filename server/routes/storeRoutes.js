import express from "express";
import { getStoreConfig } from "../controllers/storeController.js";

const router = express.Router();

router.get("/config", getStoreConfig);

export default router;
