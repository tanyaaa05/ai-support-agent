import express from 'express';
import { getHistory } from '../controllers/historyController.js';
const router = express.Router();
router.get('/:sessionId', getHistory);
export default router;
