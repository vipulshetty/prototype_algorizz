import dbConnect from '../../../app/lib/db.mjs';
import Issue from '../../../app/models/Issue.mjs';
import { authenticateToken } from '../../../app/lib/auth.mjs';
import cors, { runMiddleware } from '../../../app/lib/middleware.mjs';

export default async function handler(req, res) {
  // Run the CORS middleware
  await runMiddleware(req, res, cors);

  await dbConnect();

  authenticateToken(req, res, async () => {
    const { id } = req.query;
    const issue = await Issue.findById(id);

    if (!issue) {
      return res.status(404).json({ message: 'Issue not found' });
    }

    if (req.method === 'GET') {
      res.status(200).json(issue);
    } else if (req.method === 'PUT') {
      Object.assign(issue, req.body);
      await issue.save();
      res.status(200).json(issue);
    } else if (req.method === 'DELETE') {
      await issue.remove();
      res.status(200).json({ message: 'Issue deleted successfully' });
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  });
}
