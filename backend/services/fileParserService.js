import pdfParse from 'pdf-parse';
import fs from 'fs';

const parseFile = async (file) => {
  if (!file || !file.path) throw new Error('No file provided');
  if (file.mimetype === 'application/pdf') {
    const dataBuffer = fs.readFileSync(file.path);
    const data = await pdfParse(dataBuffer);
    return {
      title: file.originalname,
      rawText: data.text,
      tags: [],
      wordCount: data.text.split(/\s+/).length
    };
  }
  throw new Error('Unsupported file type');
};

export default {
  parseFile
};
