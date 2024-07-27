import dbConnect from '../../app/lib/db.mjs';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'POST') {
    try {
      const { complaintId } = req.body;

      const electriciansCollection = db.collection('electricians');
      const electricians = await electriciansCollection.find({ status: 'available' }).toArray();

      if (electricians.length === 0) {
        return res.status(400).json({ message: 'No available electricians' });
      }

      const assignmentInfo = await db.collection('assignmentInfo').findOne({ _id: 'assignmentInfo' });
      let index = assignmentInfo ? assignmentInfo.index : 0;

      const electrician = electricians[index];
      const complaintsCollection = db.collection('complaints');
      await complaintsCollection.updateOne(
        { _id: ObjectId(complaintId) },
        { $set: { electricianId: electrician._id } }
      );

      index = (index + 1) % electricians.length;
      await db.collection('assignmentInfo').updateOne(
        { _id: 'assignmentInfo' },
        { $set: { index } },
        { upsert: true }
      );

      res.status(200).json({ message: 'Complaint assigned successfully', electrician });
    } catch (error) {
      console.error('Error assigning complaint:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
