// pages/api/issues/index.js
import { authenticateToken } from '../../../lib/auth';

let issues = []; // In-memory issues storage (replace with your database logic)

export default function handler(req, res) {
  authenticateToken(req, res, () => {
    if (req.method === 'GET') {
      res.status(200).json(issues);
    } else if (req.method === 'POST') {
      const { category, text, customerName, address } = req.body;
      const newIssue = {
        id: issues.length + 1,
        category,
        text,
        customerName,
        address,
        electricianAssigned: null
      };
      issues.push(newIssue);
      res.status(201).json(newIssue);
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  });
}
