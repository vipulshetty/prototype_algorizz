import clientPromise from '../../../utils/mongodb';
import { assignIssueRoundRobin } from '../../../utils/roundRobinAssignment';

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db();
    const issuesCollection = db.collection('issues');
    const electriciansCollection = db.collection('electricians');

    if (req.method === 'POST') {
      const { description, name, address } = req.body;

      if (!description || !name || !address) {
        return res.status(400).json({ message: 'Description, name, and address are required' });
      }

      // Create a new issue without assignment first
      const newIssue = {
        description,
        name,
        address,
        status: 'open',
        assignedElectricianId: null, // Initially unassigned
      };

      const result = await issuesCollection.insertOne(newIssue);
      const issueId = result.insertedId;

      // Assign the issue to an electrician
      const assignedElectricianId = await assignIssueRoundRobin(issueId);

      // Update the issue with the assigned electrician ID
      await issuesCollection.updateOne(
        { _id: issueId },
        { $set: { assignedElectricianId, status: 'assigned' } }
      );

      res.status(200).json({ message: 'Issue created and assigned successfully!' });

    } else if (req.method === 'GET') {
      const issues = await issuesCollection.aggregate([
        {
          $lookup: {
            from: 'electricians',
            localField: 'assignedElectricianId',
            foreignField: '_id',
            as: 'electrician'
          }
        },
        {
          $unwind: {
            path: '$electrician',
            preserveNullAndEmptyArrays: true
          }
        },
        {
          $addFields: {
            assignedElectricianName: '$electrician.name'
          }
        },
        {
          $project: {
            electrician: 0
          }
        }
      ]).toArray();
      
      res.status(200).json(issues);

    } else {
      res.setHeader('Allow', ['POST', 'GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }

  } catch (error) {
    console.error('Error handling request:', error);
    res.status(500).json({ message: 'Failed to handle request', error: error.message });
  }
}
