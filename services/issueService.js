// services/issueService.js
async function completeIssue(issueId, electricianId) {
    try {
      await client.connect();
      const db = client.db();
      const collection = db.collection('electricians');
  
      // Update the electrician's status back to 'available'
      await collection.updateOne(
        { _id: electricianId },
        { $set: { status: 'available' } }
      );
  
      console.log('Electrician status updated to available');
  
    } catch (error) {
      console.error('Error updating electrician status:', error);
      throw error;
    } finally {
      await client.close();
    }
  }
  
  module.exports = { completeIssue };
  