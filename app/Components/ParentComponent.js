// components/ParentComponent.js

import React from 'react';
import { useDashboard } from '../contexts/DashboardContext';
import { Button, List, ListItem, ListItemText, Paper, Typography } from '@mui/material';
import styles from './ParentComponent.module.css'; // Adjust the path if needed

const ParentComponent = () => {
  const { electricians, setElectricians, issues, setIssues } = useDashboard();

  const handleDeleteElectrician = async (id) => {
    try {
      await fetch(`/api/electricians/${id}`, {
        method: 'DELETE',
      });
      setElectricians(electricians.filter(e => e._id !== id));
    } catch (error) {
      console.error('Error deleting electrician:', error);
    }
  };

  const handleDeleteIssue = async (id) => {
    try {
      await fetch(`/api/issues/${id}`, {
        method: 'DELETE',
      });
      setIssues(issues.filter(i => i._id !== id));
    } catch (error) {
      console.error('Error deleting issue:', error);
    }
  };

  return (
    <div>
      <Paper elevation={3} className={styles.paper}>
        <Typography variant="h6" className={styles.title}>Electricians</Typography>
        <List>
          {electricians.map((electrician) => (
            <ListItem key={electrician._id} className={styles.listItem}>
              <ListItemText
                primary={electrician.name}
                secondary={`Status: ${electrician.status}, Assigned Issues: ${electrician.assignedIssues}, Solved Complaints: ${electrician.solvedComplaints}`}
              />
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleDeleteElectrician(electrician._id)}
              >
                Delete
              </Button>
            </ListItem>
          ))}
        </List>
      </Paper>
      
      <Paper elevation={3} className={styles.paper}>
        <Typography variant="h6" className={styles.title}>Issues</Typography>
        <List>
          {issues.map((issue) => (
            <ListItem key={issue._id} className={styles.listItem}>
              <ListItemText
                primary={`${issue.category}: ${issue.description}`}
                secondary={`Customer: ${issue.name}, Address: ${issue.address}, Assigned Electrician: ${issue.electrician || 'Unassigned'}`}
              />
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleDeleteIssue(issue._id)}
              >
                Delete
              </Button>
            </ListItem>
          ))}
        </List>
      </Paper>
    </div>
  );
};

export default ParentComponent;
