// pages/api/electricians.js
import { MongoClient } from 'mongodb';

const MONGO_URI = 'mongodb://localhost:27017/algorizz';
const client = new MongoClient(MONGO_URI);

export default async function handler(req, res) {
  try {
    await client.connect();
    const db = client.db();
    const collection = db.collection('electricians');

    if (req.method === 'POST') {
      const { name, expertise, contact, email } = req.body;

      // Detailed request validation
      if (!name || !expertise || !contact) {
        console.error('Missing required fields:', { name, expertise, contact });
        return res.status(400).json({ message: 'Missing required fields' });
      }

      // Ensure email is either not provided or correctly provided if indexed
      if (email === undefined) {
        console.error('Email field is required but not provided');
        return res.status(400).json({ message: 'Email field is required' });
      }

      const newElectrician = { name, expertise, contact, email };
      const result = await collection.insertOne(newElectrician);

      if (result.acknowledged) {
        res.status(200).json({ message: 'Electrician added successfully!' });
      } else {
        console.error('Failed to add electrician:', result);
        throw new Error('Failed to add electrician');
      }
    } else if (req.method === 'GET') {
      const electricians = await collection.find({}).toArray();
      res.status(200).json(electricians);
    } else {
      res.setHeader('Allow', ['POST', 'GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('Error handling request:', error);
    res.status(500).json({ message: 'Failed to handle request', error: error.message });
  } finally {
    await client.close();
  }
}
