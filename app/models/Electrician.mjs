// app/models/Electrician.mjs
import mongoose from 'mongoose';

const electricianSchema = new mongoose.Schema({
  name: { type: String, required: true },
  status: { type: String, default: 'Available' },
  assignedIssues: { type: Number, default: 0 },
  solvedComplaints: { type: Number, default: 0 },
});

export default mongoose.models.Electrician || mongoose.model('Electrician', electricianSchema);
