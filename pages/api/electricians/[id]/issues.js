// /pages/api/electricians/[id]/issues.js

import dbConnect from '../../../../app/lib/db.mjs';
import Electrician from '../../../../app/models/Electrician';
import Issue from '../../../../app/models/Issue';

export default async function handler(req, res) {
  await dbConnect();

  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case 'GET':
      try {
        // Fetch the electrician
        const electrician = await Electrician.findById(id);

        if (!electrician) {
          return res.status(404).json({ message: 'Electrician not found' });
        }

        // Fetch the issues assigned to this electrician
        const issues = await Issue.find({ assignedTo: id });

        res.status(200).json(issues);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch issues' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
