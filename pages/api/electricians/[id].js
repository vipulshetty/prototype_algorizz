import clientPromise from '../../../utils/mongodb';
import { ObjectId } from 'mongodb';
import cors, { runMiddleware } from '../../../app/lib/cors';
import dbConnect from '../../../app/lib/db.mjs'; // Adjusted to use .mjs file

export default async function handler(req, res) {
  await runMiddleware(req, res, cors);

  try {
    await dbConnect(); // Ensure database is connected
    const { id } = req.query;
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection('electricians');

    if (req.method === 'GET') {
      const electrician = await collection.findOne({ _id: new ObjectId(id) });
      if (!electrician) {
        return res.status(404).json({ message: 'Electrician not found' });
      }
      res.status(200).json(electrician);
    } else if (req.method === 'DELETE') {
      const result = await collection.deleteOne({ _id: new ObjectId(id) });
      if (result.deletedCount === 0) {
        return res.status(404).json({ message: 'Electrician not found' });
      }
      res.status(200).json({ message: 'Electrician deleted successfully' });
    } else {
      res.setHeader('Allow', ['GET', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('Error handling request:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}
