"use client";
import { useState } from 'react';
import { Button, TextField, Snackbar, Alert } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useDashboard } from '../contexts/DashboardContext';

const ElectricianForm = () => {
  const { addElectrician } = useDashboard();
  const [name, setName] = useState('');
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    addElectrician({ name, status: 'Available', assignedIssues: 0, solvedComplaints: 0 });
    setName('');
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      router.push('/dashboard');
    }, 2000);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <TextField
        label="Electrician Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <Button type="submit" variant="contained" color="primary">
        Add Electrician
      </Button>
      <Snackbar open={success} autoHideDuration={2000}>
        <Alert severity="success">Electrician added successfully!</Alert>
      </Snackbar>
    </form>
  );
};

export default ElectricianForm;
