import clientPromise from './mongodb';
import { ObjectId } from 'mongodb';

export async function assignIssueRoundRobin(issueId) {
  try {
    const client = await clientPromise;
    const db = client.db();
    const electriciansCollection = db.collection('electricians');

    // Find available electricians
    const electricians = await electriciansCollection.find({ status: 'available' }).toArray();

    if (electricians.length === 0) {
      throw new Error('No available electricians');
    }

    // Select the first available electrician
    const electrician = electricians[0];

    // Assign the issue to the selected electrician
    await electriciansCollection.updateOne(
      { _id: electrician._id },
      { $set: { status: 'busy', currentIssueId: issueId }, $inc: { assignedIssues: 1 } }
    );

    return electrician._id; // Return the electrician's ID

  } catch (error) {
    console.error('Error assigning issue:', error);
    throw error;
  }
}
