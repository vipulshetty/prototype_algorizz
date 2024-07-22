import dbConnect from '../../../lib/dbConnect';
import Electrician from '../../../models/Electrician';

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const electricians = await Electrician.find({});
        res.status(200).json({ success: true, data: electricians });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'POST':
      try {
        const electrician = await Electrician.create(req.body);
        res.status(201).json({ success: true, data: electrician });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
