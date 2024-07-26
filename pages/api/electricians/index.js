// pages/api/electricians/index.js
import dbConnect from '../../../app/lib/db';
import Electrician from '../../../app/models/electricians';
import { authenticateToken } from '../../../app/lib/auth';

export default async function handler(req, res) {
  await dbConnect();

  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const electricians = await Electrician.find({});
        res.status(200).json({ success: true, data: electricians });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;
    case 'POST':
      try {
        authenticateToken(req, res, async () => {
          const electrician = await Electrician.create(req.body);
          res.status(201).json({ success: true, data: electrician });
        });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;
    default:
      res.status(405).json({ success: false, message: `Method ${method} Not Allowed` });
      break;
  }
}
