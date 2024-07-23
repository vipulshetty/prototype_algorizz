export default async (req, res) => {
    if (req.method === 'POST') {
      // Handle the issue submission
      const { issue } = req.body;
      
      // Here, you would save the issue to your database or handle it as needed.
      
      res.status(200).json({ message: 'Issue received', issue });
    } else {
      res.status(405).json({ message: 'Method Not Allowed' });
    }
  };
  