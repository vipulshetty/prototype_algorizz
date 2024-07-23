export default async (req, res) => {
    const { action, data } = req.body;
  
    switch (action) {
      case 'add-issue':
        // Add issue logic here
        // Save the issue to your database
        res.status(200).json({ message: 'Issue added', data });
        break;
  
      case 'add-electrician':
        // Add electrician logic here
        // Save the electrician to your database
        res.status(200).json({ message: 'Electrician added', data });
        break;
  
      case 'get-issues':
        // Get issues logic here
        // Retrieve issues from your database
        const issues = []; // Replace with actual issues
        res.status(200).json({ message: 'Issues retrieved', issues });
        break;
  
      case 'get-electricians':
        // Get electricians logic here
        // Retrieve electricians from your database
        const electricians = []; // Replace with actual electricians
        res.status(200).json({ message: 'Electricians retrieved', electricians });
        break;
  
      default:
        res.status(400).json({ message: 'Invalid action' });
        break;
    }
  };
  