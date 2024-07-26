// /pages/api/electricians/[id].js
import dbConnect from '../../../app/lib/db.mjs';
import Electrician from '../../../app/models/Electrician.mjs';
import { authenticateToken } from '../../../app/lib/auth.mjs';
import cors, { runMiddleware } from '../../../app/lib/middleware.mjs';

export default async function handler(req, res) {
  // Run the CORS middleware
  await runMiddleware(req, res, cors);

  // Connect to the database
  await dbConnect();

  authenticateToken(req, res, async () => {
    const { id } = req.query;

    if (req.method === 'GET') {
      try {
        const electrician = await Electrician.findById(id);
        if (!electrician) {
          return res.status(404).json({ message: 'Electrician not found' });
        }
        res.status(200).json(electrician);
      } catch (error) {
        res.status(500).json({ message: 'Error fetching electrician' });
      }
    } else if (req.method === 'PUT') {
      try {
        const { name, status, assignedIssues, solvedComplaints } = req.body;
        const electrician = await Electrician.findByIdAndUpdate(
          id,
          { name, status, assignedIssues, solvedComplaints },
          { new: true, runValidators: true }
        );
        if (!electrician) {
          return res.status(404).json({ message: 'Electrician not found' });
        }
        res.status(200).json(electrician);
      } catch (error) {
        res.status(500).json({ message: 'Error updating electrician' });
      }
    } else if (req.method === 'DELETE') {
      try {
        const electrician = await Electrician.findByIdAndDelete(id);
        if (!electrician) {
          return res.status(404).json({ message: 'Electrician not found' });
        }
        res.status(204).end();
      } catch (error) {
        res.status(500).json({ message: 'Error deleting electrician' });
      }
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  });
}
