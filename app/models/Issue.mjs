import mongoose from 'mongoose';

const IssueSchema = new mongoose.Schema({
  category: { type: String, required: true },
  description: { type: String, required: true },
  customerName: { type: String, required: true },
  address: { type: String, required: true },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'Electrician' },
  status: { type: String, enum: ['open', 'closed'], default: 'open' }
});

export default mongoose.models.Issue || mongoose.model('Issue', IssueSchema);
