import { Router } from "express";
const router = Router();

import { getPopulate } from "../controllers/getPopulateController.js";
import { getAllData } from "../controllers/getAllDataController.js";
import { getStats } from "../controllers/getStatsController.js";
import { getBarChart } from "../controllers/getBarChartController.js";
import { getPieChart } from "../controllers/getPieChartController.js";
import {getCombineData} from "../controllers/getCombineDataController.js";

router.get("/populate", getPopulate);
router.get("/:month", getAllData);
router.get("/:month/stats", getStats);
router.get("/:month/barChart", getBarChart);
router.get("/:month/pieChart", getPieChart);
router.get("/:month/combineData", getCombineData);

export default router;
