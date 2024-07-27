import { assignIssue } from '../../../app/utils/roundRobinAssignment';
import dbConnect from '../../../app/lib/db.mjs';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'POST') {
    const { issueId } = req.body;
    if (!issueId) {
      return res.status(400).json({ error: 'Issue ID is required' });
    }

    try {
      const issue = await assignIssue(issueId);
      res.status(200).json(issue);
    } catch (error) {
      res.status(500).json({ error: 'Failed to assign issue' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
