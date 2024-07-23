import { issues, electricians } from '../../../data';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { category, description, customerName, customerAddress } = req.body;
    const newIssue = {
      id: issues.length + 1,
      category,
      description,
      customerName,
      customerAddress,
      status: 'open',
    };

    issues.push(newIssue);

    // Round-robin assignment
    const availableElectrician = electricians.find(e => e.status === 'available');
    if (availableElectrician) {
      availableElectrician.status = 'busy';
      newIssue.assignedTo = availableElectrician.id;
    }

    res.status(201).json(newIssue);
  } else if (req.method === 'GET') {
    res.status(200).json(issues);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
