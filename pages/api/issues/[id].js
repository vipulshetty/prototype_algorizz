import { MongoClient, ObjectId } from 'mongodb';
import cors, { runMiddleware } from '../../../app/lib/cors';
import dbConnect from '../../../app/lib/db.mjs'; // Path to your db.mjs

const MONGO_URI = process.env.MONGO_URI;
const client = new MongoClient(MONGO_URI, { serverSelectionTimeoutMS: 5000 });

export default async function handler(req, res) {
  await runMiddleware(req, res, cors);

  if (req.method === 'DELETE') {
    try {
      await dbConnect(); // Ensure database is connected
      const { id } = req.query;
      const db = client.db();
      const collection = db.collection('issues');
      const result = await collection.deleteOne({ _id: new ObjectId(id) });

      if (result.deletedCount === 0) {
        return res.status(404).json({ message: 'Issue not found' });
      }

      res.status(200).json({ message: 'Issue deleted successfully' });
    } catch (error) {
      console.error('Error deleting issue:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
