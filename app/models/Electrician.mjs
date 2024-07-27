import mongoose from 'mongoose';

const ElectricianSchema = new mongoose.Schema({
  name: { type: String, required: true },
  status: { type: String, required: true },
  assignedIssues: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Issue' }],
  solvedIssues: { type: Number, default: 0 },
});

export default mongoose.models.Electrician || mongoose.model('Electrician', ElectricianSchema);
