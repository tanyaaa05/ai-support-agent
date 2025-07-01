import CompanyData from '../models/CompanyData.js';
import pdfParse from 'pdf-parse';
import fs from 'fs';

export const parseAndStoreFAQ = async (file) => {
  let rawText = '';
  if (file.mimetype === 'application/pdf') {
    const dataBuffer = fs.readFileSync(file.path);
    const data = await pdfParse(dataBuffer);
    rawText = data.text;
  } else if (file.mimetype === 'text/plain') {
    rawText = fs.readFileSync(file.path, 'utf-8');
  } else if (file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
    // DOCX support not available: install a docx parser or use a cloud service
    throw new Error('DOCX parsing not supported. Please upload PDF or TXT files.');
  } else {
    throw new Error('Unsupported file type');
  }
  const doc = await CompanyData.create({ title: file.originalname, rawText, tags: [] });
  console.log(`[FAQService] Stored company data: ${file.originalname}`);
  return { success: true, id: doc._id };
};

export const fetchFAQs = async () => {
  const faqs = await CompanyData.find();
  console.log('[FAQService] Fetched all company data');
  return faqs;
};
