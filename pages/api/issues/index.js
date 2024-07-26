// pages/api/issues.js
import { MongoClient } from 'mongodb';

const MONGO_URI = 'mongodb://localhost:27017/algorizz';
const client = new MongoClient(MONGO_URI);

export default async function handler(req, res) {
  try {
    await client.connect();
    const db = client.db();
    const collection = db.collection('issues');

    if (req.method === 'POST') {
      // Handle POST request
      const { description, name, address, electrician } = req.body;
      const newIssue = { description, name, address, electrician };
      await collection.insertOne(newIssue);
      res.status(200).json({ message: 'Issue added successfully!' });
    } else if (req.method === 'GET') {
      // Handle GET request
      const issues = await collection.find({}).toArray();
      res.status(200).json(issues);
    } else {
      res.setHeader('Allow', ['POST', 'GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to handle request', error });
  } finally {
    await client.close();
  }
}
