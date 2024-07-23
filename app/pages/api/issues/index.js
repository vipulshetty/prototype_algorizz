import dbConnect from '../../../lib/db';
import Issue from '../../../models/Issue';
import { authenticateToken } from '../../../lib/auth';
import cors, { runMiddleware } from '../../../lib/middleware';

export default async function handler(req, res) {
  // Run the CORS middleware
  await runMiddleware(req, res, cors);

  await dbConnect();

  authenticateToken(req, res, async () => {
    if (req.method === 'GET') {
      const issues = await Issue.find({});
      res.status(200).json(issues);
    } else if (req.method === 'POST') {
      const { category, text, customerName, address } = req.body;
      const newIssue = new Issue({
        category,
        text,
        customerName,
        address,
      });
      await newIssue.save();
      res.status(201).json(newIssue);
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  });
}
