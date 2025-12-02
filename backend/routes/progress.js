import express from 'express';
import {getProgress,updateProgress} from "../controllers/progress.js";
import {verifyUser } from "../middleware/auth.js";

const router = express.Router();
router.get("/",verifyUser,getProgress);
router.put("/",verifyUser,updateProgress);
export default router;

