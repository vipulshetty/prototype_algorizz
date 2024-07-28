import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { CircularProgress, Alert, List, ListItem, ListItemText, Typography, Paper } from '@mui/material';

const ElectricianDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [electrician, setElectrician] = useState(null);
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const electricianResponse = await axios.get(`/api/electricians/${id}`);
          const issuesResponse = await axios.get(`/api/electricians/${id}/issues`);
          setElectrician(electricianResponse.data);
          setIssues(issuesResponse.data);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [id]);

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <div>
      {electrician && (
        <Paper style={{ padding: 20, marginBottom: 20 }}>
          <Typography variant="h5">{electrician.name}</Typography>
          <Typography variant="body1">Expertise: {electrician.expertise}</Typography>
          <Typography variant="body1">Contact: {electrician.contact}</Typography>
          <Typography variant="body1">Email: {electrician.email}</Typography>
          <Typography variant="body1">Assigned Issues: {electrician.assignedIssues || 0}</Typography>
          <Typography variant="body1">Solved Complaints: {electrician.solvedComplaints || 0}</Typography>
        </Paper>
      )}
      <Typography variant="h6">Assigned Issues</Typography>
      <List>
        {issues.map(issue => (
          <ListItem key={issue._id}>
            <ListItemText
              primary={issue.description}
              secondary={`Customer: ${issue.name}, Address: ${issue.address}, Status: ${issue.status}`}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default ElectricianDetail;
