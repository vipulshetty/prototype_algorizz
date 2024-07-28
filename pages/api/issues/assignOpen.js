import { assignOpenIssues } from '../../../utils/roundRobinAssignment';
import dbConnect from '../../../app/lib/db.mjs';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'POST') {
    try {
      await assignOpenIssues();
      res.status(200).json({ message: 'Open issues assigned successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to assign open issues' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
