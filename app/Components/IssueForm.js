"use client";
import { useState } from 'react';
import { Button, TextField, Snackbar, Alert } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useDashboard } from '../contexts/DashboardContext';

const IssueForm = () => {
  const { addIssue } = useDashboard();
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/issues', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description, name, address, electrician: null }),
      });
  
      if (response.ok) {
        setDescription('');
        setName('');
        setAddress('');
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          router.push('/dashboard');
        }, 2000);
      } else {
        throw new Error('Failed to add issue');
      }
    } catch (error) {
      console.error('Failed to add issue', error);
    }
  };
  

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
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
