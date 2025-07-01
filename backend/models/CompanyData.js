import mongoose from 'mongoose';

// CompanyData schema for storing uploaded company documents/FAQs
const companyDataSchema = new mongoose.Schema({
  title: { type: String, required: true },
  rawText: { type: String, required: true },
  tags: [String],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('CompanyData', companyDataSchema);
