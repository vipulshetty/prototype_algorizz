import mongoose from 'mongoose';

const IssueSchema = new mongoose.Schema({
  category: { type: String, required: true },
  text: { type: String, required: true },
  customerName: { type: String, required: true },
  address: { type: String, required: true },
}, {
  timestamps: true,
});

export default mongoose.models.Issue || mongoose.model('Issue', IssueSchema);
