import express from 'express';
import multer from 'multer';
import * as faqController from '../controllers/faqController.js';
const upload = multer({ dest: 'uploads/' });
const router = express.Router();
router.post('/upload', upload.single('file'), faqController.uploadFAQ);
router.get('/', faqController.listFAQs);
export default router;
