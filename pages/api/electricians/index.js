import clientPromise from '../../../utils/mongodb';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all origins
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Allow specific methods
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // Allow specific headers

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection('electricians');

    if (req.method === 'POST') {
      const { name, expertise, contact, email } = req.body;

      if (!name || !expertise || !contact || !email) {
        return res.status(400).json({ message: 'Missing required fields' });
      }

      const newElectrician = { name, expertise, contact, email, status: 'available', assignedIssues: 0, solvedComplaints: 0 };
      const result = await collection.insertOne(newElectrician);

      if (result.acknowledged) {
        res.status(201).json({ message: 'Electrician added successfully!' });
      } else {
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
  }
}
