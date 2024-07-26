// components/IssueList.js
import { useEffect, useState } from 'react';
import { CircularProgress, List, ListItem, ListItemText } from '@mui/material';

const IssueList = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await fetch('/api/issues');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setIssues(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchIssues();
  }, []);

  if (loading) return <CircularProgress />;
  if (error) return <p>Error loading issues: {error.message}</p>;

  return (
    <List>
      {issues.map((issue) => (
        <ListItem key={issue._id}>
          <ListItemText
            primary={`Name: ${issue.name}`}
            secondary={`Description: ${issue.description}, Address: ${issue.address}`}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default IssueList;
