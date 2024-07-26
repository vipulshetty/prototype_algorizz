"use client";
import { useRouter } from 'next/navigation';
import { useDashboard } from '../contexts/DashboardContext';
import { Grid, Paper, Button, Typography, List, ListItem, ListItemText } from '@mui/material';
import styles from './Dashboard.module.css';

const Dashboard = () => {
  const router = useRouter();
  const { electricians, issues } = useDashboard();

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
            {electricians.map((electrician, index) => (
              <ListItem key={index} className={styles.listItem}>
                <ListItemText primary={electrician.name} secondary={`Status: ${electrician.status}, Assigned Issues: ${electrician.assignedIssues}, Solved Complaints: ${electrician.solvedComplaints}`} />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper elevation={3} className={styles.paper}>
          <Typography variant="h6" className={styles.subtitle}>Issues</Typography>
          <List>
            {issues.map((issue, index) => (
              <ListItem key={index} className={styles.listItem}>
                <ListItemText primary={`${issue.category}: ${issue.description}`} secondary={`Customer: ${issue.name}, Address: ${issue.address}, Assigned Electrician: ${issue.electrician || 'Unassigned'}`} />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Dashboard;