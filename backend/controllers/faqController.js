// Handles FAQ-related requests
import fileParserService from '../services/fileParserService.js';
import CompanyData from '../models/CompanyData.js';

// Upload a new FAQ/company document (PDF or TXT)
export const uploadFAQ = async (req, res, next) => {
  try {
    const { file } = req;
    if (!file) {
      // Warn if no file is uploaded
      return res.status(400).json({ error: 'No file uploaded.' });
    }
    // Parse and store the uploaded file
    const parsed = await fileParserService.parseFile(file);
    const doc = await CompanyData.create(parsed);
    res.json({ title: doc.title, size: file.size, wordCount: parsed.wordCount });
  } catch (err) {
    next(err);
  }
};

// List all uploaded FAQ/company documents
export const listFAQs = async (req, res, next) => {
  try {
    const faqs = await CompanyData.find({}, 'title createdAt tags');
    res.json(faqs);
  } catch (err) {
    next(err);
  }
};
