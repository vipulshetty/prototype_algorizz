"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { useDashboard } from '../contexts/DashboardContext';
import { Button, Grid, List, ListItem, ListItemText, Paper, Typography } from '@mui/material';
import styles from './Dashboard.module.css';

const Dashboard = () => {
  const router = useRouter();
  const { electricians, setElectricians, issues, setIssues } = useDashboard();

  // Handle deleting an electrician
  const handleDeleteElectrician = async (id) => {
    try {
      await fetch(`/api/electricians/${id}`, {
        method: 'DELETE',
      });
      // Update state after successful deletion
      setElectricians(electricians.filter(e => e._id !== id));
    } catch (error) {
      console.error('Error deleting electrician:', error);
    }
  };

  // Handle deleting an issue
  const handleDeleteIssue = async (id) => {
    try {
      const response = await fetch(`/api/issues/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      alert(data.message);
      // Update state after successful deletion
      setIssues(issues.filter(i => i._id !== id));
    } catch (error) {
      console.error('Error deleting issue:', error);
    }
  };

  // Handle navigating to electrician details
  const handleViewElectrician = (id) => {
    router.push(`/electricians/${id}`);
  };

  return (
    <Grid container spacing={3} className={styles.container}>
      <Grid item xs={12}>
        <Paper elevation={3} className={styles.paper}>
          <Typography variant="h5" className={styles.title}>Dashboard</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} className={styles.buttonContainer}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => router.push('/add-electrician')}
          className={styles.button}
        >
          Add Electrician
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => router.push('/add-issue')}
          className={styles.button}
        >
          Add Issue
        </Button>
      </Grid>
      <Grid item xs={6}>
        <Paper elevation={3} className={styles.paper}>
          <Typography variant="h6" className={styles.subtitle}>Electricians</Typography>
          <List>
            {electricians.map((electrician) => (
              <ListItem key={electrician._id} className={styles.listItem}>
                <ListItemText
                  primary={electrician.name}
                  secondary={`Status: ${electrician.status}, Assigned Issues: ${electrician.assignedIssues || 0}, Solved Complaints: ${electrician.solvedComplaints || 0}`}
                  onClick={() => handleViewElectrician(electrician._id)} // Navigate on click
                  style={{ cursor: 'pointer' }} // Pointer cursor to indicate clickable item
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
      </Grid>
      <Grid item xs={6}>
        <Paper elevation={3} className={styles.paper}>
          <Typography variant="h6" className={styles.subtitle}>Issues</Typography>
          <List>
            {issues.map((issue) => (
              <ListItem key={issue._id} className={styles.listItem}>
                <ListItemText
                  primary={`${issue.description}`}
                  secondary={`Customer: ${issue.name}, Address: ${issue.address}, Assigned Electrician: ${issue.assignedElectricianName || 'Unassigned'}, Status: ${issue.status}`}
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
      </Grid>
    </Grid>
  );
};

export default Dashboard;
