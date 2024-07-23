const mongoose = require('mongoose');

const electricianSchema = new mongoose.Schema({
  name: String,
  assignedIssues: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Issue',
    }
  ]
});

module.exports = mongoose.models.Electrician || mongoose.model('Electrician', electricianSchema);
