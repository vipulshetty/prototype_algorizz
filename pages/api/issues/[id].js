import { MongoClient, ObjectId } from 'mongodb';
import clientPromise from '../../../utils/mongodb';

export default async function handler(req, res) {
  const { id } = req.query;

  try {
    const client = await clientPromise;
    const db = client.db();
    const issuesCollection = db.collection('issues');
    const electriciansCollection = db.collection('electricians');

    if (req.method === 'PUT') {
      const { status } = req.body;

      if (!status) {
        return res.status(400).json({ message: 'Status is required' });
      }

      // Find the issue to update
      const issue = await issuesCollection.findOne({ _id: new ObjectId(id) });

      if (!issue) {
        return res.status(404).json({ message: 'Issue not found' });
      }

      // Update the issue status
      await issuesCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { status } }
      );

      if (status === 'completed') {
        // If the issue is completed, update the electrician's solved complaint count
        const electricianId = issue.assignedElectricianId;

        if (electricianId) {
          await electriciansCollection.updateOne(
            { _id: new ObjectId(electricianId) },
            { $inc: { solvedComplaints: 1 } }
          );
        }
      }

      res.status(200).json({ message: 'Issue updated successfully!' });

    } else if (req.method === 'DELETE') {
      // Find the issue to delete
      const issue = await issuesCollection.findOne({ _id: new ObjectId(id) });

      if (!issue) {
        return res.status(404).json({ message: 'Issue not found' });
      }

      // Remove the issue
      await issuesCollection.deleteOne({ _id: new ObjectId(id) });

      // Update the electrician's status if assigned
      const electricianId = issue.assignedElectricianId;

      if (electricianId) {
        await electriciansCollection.updateOne(
          { _id: new ObjectId(electricianId) },
          { $set: { status: 'available', currentIssueId: null } }
        );
      }

      res.status(200).json({ message: 'Issue deleted successfully!' });

    } else if (req.method === 'GET') {
      const issue = await issuesCollection.findOne({ _id: new ObjectId(id) });

      if (!issue) {
        return res.status(404).json({ message: 'Issue not found' });
      }

      // Fetch the assigned electrician details
      const electrician = issue.assignedElectricianId
        ? await electriciansCollection.findOne({ _id: new ObjectId(issue.assignedElectricianId) })
        : null;

      res.status(200).json({
        ...issue,
        assignedElectrician: electrician ? electrician.name : 'Unassigned',
      });

    } else {
      res.setHeader('Allow', ['PUT', 'DELETE', 'GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }

  } catch (error) {
    console.error('Error handling request:', error);
    res.status(500).json({ message: 'Failed to handle request', error: error.message });
  }
}
