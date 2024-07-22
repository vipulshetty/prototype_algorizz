import dbConnect from '../../../lib/dbConnect';
import Issue from '../../../models/Issue';

export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;

  await dbConnect();

  switch (method) {
    case 'PATCH':
      try {
        const issue = await Issue.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json({ success: true, data: issue });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'DELETE':
      try {
        const deletedIssue = await Issue.deleteOne({ _id: id });
        res.status(200).json({ success: true, data: deletedIssue });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
