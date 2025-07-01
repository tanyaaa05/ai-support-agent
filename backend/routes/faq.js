import express from 'express';
import { uploadFAQ, listFAQs } from '../controllers/faqController.js';
import multer from 'multer';

const upload = multer({ dest: 'uploads/' });
const router = express.Router();

router.post('/upload', upload.single('file'), uploadFAQ);
router.get('/', listFAQs);

export default router;
