import clientPromise from '../../../../utils/mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  const { id } = req.query;

  try {
    const client = await clientPromise;
    const db = client.db();
    const issuesCollection = db.collection('issues');

    if (req.method === 'GET') {
      const issues = await issuesCollection.find({ assignedElectricianId: new ObjectId(id) }).toArray();
      if (!issues.length) {
        return res.status(404).json({ message: 'No issues found for this electrician' });
      }
      res.status(200).json(issues);
    } else {
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('Error handling request:', error);
    res.status(500).json({ message: 'Failed to handle request', error: error.message });
  }
}
