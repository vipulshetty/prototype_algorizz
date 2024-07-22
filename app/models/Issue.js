import mongoose from 'mongoose';

const IssueSchema = new mongoose.Schema({
  category: String,
  description: String,
  customerName: String,
  address: String,
  status: String,
  solution: String,
  electrician: String,
});

export default mongoose.models.Issue || mongoose.model('Issue', IssueSchema);
