"use client";
import { Paper, Typography } from '@mui/material';
import IssueForm from '../Components/IssueForm';

export default function AddIssuePage() {
  return (
    <Paper elevation={3} style={{ padding: '16px', marginTop: '20px' }}>
      <Typography variant="h5">Add Issue</Typography>
      <IssueForm />
    </Paper>
  );
}
