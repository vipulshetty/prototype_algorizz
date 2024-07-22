import dbConnect from '../../../lib/dbConnect';
import Electrician from '../../../models/Electrician';

export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;

  await dbConnect();

  switch (method) {
    case 'DELETE':
      try {
        const deletedElectrician = await Electrician.deleteOne({ _id: id });
        res.status(200).json({ success: true, data: deletedElectrician });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
