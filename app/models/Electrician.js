import mongoose from 'mongoose';

const ElectricianSchema = new mongoose.Schema({
  name: String,
  assignedIssues: Number,
  solvedComplaints: Number,
});

export default mongoose.models.Electrician || mongoose.model('Electrician', ElectricianSchema);
