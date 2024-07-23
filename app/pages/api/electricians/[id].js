import { issues, electricians } from '../../../data';

export default function handler(req, res) {
  const { id } = req.query;
  const issueIndex = issues.findIndex(issue => issue.id === parseInt(id));

  if (issueIndex === -1) {
    res.status(404).json({ message: 'Issue not found' });
    return;
  }

  if (req.method === 'GET') {
    res.status(200).json(issues[issueIndex]);
  } else if (req.method === 'PUT') {
    const { category, description, customerName, customerAddress, status } = req.body;

    issues[issueIndex] = {
      ...issues[issueIndex],
      category,
      description,
      customerName,
      customerAddress,
      status,
    };

    if (status === 'closed') {
      const assignedElectrician = electricians.find(e => e.id === issues[issueIndex].assignedTo);
      if (assignedElectrician) {
        assignedElectrician.status = 'available';
        assignedElectrician.solvedIssues += 1;
      }
    }

    res.status(200).json(issues[issueIndex]);
  } else if (req.method === 'DELETE') {
    issues.splice(issueIndex, 1);
    res.status(204).end();
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
