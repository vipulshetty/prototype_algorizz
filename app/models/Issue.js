const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
  category: String,
  text: String,
  customerName: String,
  address: String,
  electricianAssigned: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Electrician',
    default: null,
  },
  status: {
    type: String,
    enum: ['open', 'closed'],
    default: 'open',
  }
});

module.exports = mongoose.models.Issue || mongoose.model('Issue', issueSchema);
