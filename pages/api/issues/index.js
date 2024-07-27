import { MongoClient } from 'mongodb';

const MONGO_URI = process.env.MONGO_URI;
const client = new MongoClient(MONGO_URI);

export default async function handler(req, res) {
  try {
    console.log('Received request:', req.method);
    await client.connect();
    const db = client.db();
    const collection = db.collection('issues');

    if (req.method === 'POST') {
      console.log('POST request body:', req.body);
      const { description, name, address, electrician } = req.body;
      const newIssue = { description, name, address, electrician };
      await collection.insertOne(newIssue);
      res.status(200).json({ message: 'Issue added successfully!' });
    } else if (req.method === 'GET') {
      const issues = await collection.find({}).toArray();
      console.log('Fetched issues:', issues);
      res.status(200).json(issues);
    } else {
      res.setHeader('Allow', ['POST', 'GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('Error handling request:', error);
    res.status(500).json({ message: 'Failed to handle request', error });
  } finally {
    await client.close();
  }
}
