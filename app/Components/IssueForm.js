"use client";
import { useState } from 'react';
import { Button, TextField, MenuItem, Snackbar, Alert } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useDashboard } from '../contexts/DashboardContext';

const IssueForm = () => {
  const { addIssue } = useDashboard();
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    addIssue({ category, description, name, address, electrician: null });
    setCategory('');
    setDescription('');
    setName('');
    setAddress('');
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      router.push('/dashboard');
    }, 2000);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <TextField
        label="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        select
        required
      >
        <MenuItem value="Electrical">Electrical</MenuItem>
        <MenuItem value="Plumbing">Plumbing</MenuItem>
        <MenuItem value="HVAC">HVAC</MenuItem>
        <MenuItem value="General">General</MenuItem>
      </TextField>
      <TextField
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        multiline
        rows={4}
      />
      <TextField
        label="Customer Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <TextField
        label="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        required
      />
      <Button type="submit" variant="contained" color="primary">
        Add Issue
      </Button>
      <Snackbar open={success} autoHideDuration={2000}>
        <Alert severity="success">Issue added successfully!</Alert>
      </Snackbar>
    </form>
  );
};

export default IssueForm;
