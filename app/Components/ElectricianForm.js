"use client";

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { TextField, Button, CircularProgress, Alert } from '@mui/material';

const ElectricianForm = ({ electrician, onSave }) => {
  const [name, setName] = useState(electrician ? electrician.name : '');
  const [expertise, setExpertise] = useState(electrician ? electrician.expertise : '');
  const [contact, setContact] = useState(electrician ? electrician.contact : '');
  const [email, setEmail] = useState(electrician ? electrician.email : '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false); // State to track success

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const payload = { name, expertise, contact, email };
      console.log('Submitting payload:', payload);

      const response = electrician
        ? await axios.put(`http://localhost:3000/api/electricians/${electrician._id}`, payload)
        : await axios.post('http://localhost:3000/api/electricians', payload);

      console.log('Response received:', response.data);
      setSuccess(true); // Set success to true on successful submission
      if (onSave) {
        onSave(response.data);
      }

      // Redirect to dashboard page after 2 seconds
      setTimeout(() => {
        router.push('/dashboard');
      }, 2000);
    } catch (error) {
      console.error('Error occurred during Axios request:', error); // Detailed error logging
      if (error.response) {
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
        console.error('Error response headers:', error.response.headers);
      } else if (error.request) {
        console.error('Error request data:', error.request);
      } else {
        console.error('Error message:', error.message);
      }
      setError('Failed to save electrician.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Expertise"
        value={expertise}
        onChange={(e) => setExpertise(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Contact"
        value={contact}
        onChange={(e) => setContact(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        margin="normal"
      />
      {loading && <CircularProgress />}
      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">Electrician saved successfully!</Alert>}
      <Button type="submit" variant="contained" color="primary" disabled={loading}>
        {electrician ? 'Update' : 'Add'} Electrician
      </Button>
    </form>
  );
};

export default ElectricianForm;
