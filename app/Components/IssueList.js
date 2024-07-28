import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CircularProgress, Alert } from '@mui/material';

const IssuesList = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await axios.get('/api/issues');
        setIssues(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchIssues();
    
    // Poll for updates every 30 seconds
    const intervalId = setInterval(fetchIssues, 30000);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <div>
      <h1>Issues</h1>
      {issues.map(issue => (
        <div key={issue._id}>
          <h2>{issue.description}</h2>
          <p>Customer: {issue.name}</p>
          <p>Address: {issue.address}</p>
          <p>Assigned to: {issue.assignedElectricianName || 'Unassigned'}</p>
          <p>Status: {issue.status}</p>
        </div>
      ))}
    </div>
  );
};

export default IssuesList;
