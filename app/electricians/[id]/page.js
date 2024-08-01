"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CircularProgress, Paper, Typography, Alert } from '@mui/material';
import axios from 'axios';

const ElectricianDetailsPage = ({ params }) => {
  const [electrician, setElectrician] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { id } = params;

  useEffect(() => {
    const fetchElectrician = async () => {
      try {
        const response = await axios.get(`/api/electricians/${id}`);
        setElectrician(response.data);
      } catch (error) {
        setError('Failed to fetch electrician details.');
      } finally {
        setLoading(false);
      }
    };

    fetchElectrician();
  }, [id]);

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Paper elevation={3} style={{ padding: '16px', marginTop: '20px' }}>
      <Typography variant="h5">Electrician Details</Typography>
      {electrician ? (
        <div>
          <Typography variant="body1">Name: {electrician.name}</Typography>
          <Typography variant="body1">Expertise: {electrician.expertise}</Typography>
          <Typography variant="body1">Contact: {electrician.contact}</Typography>
          <Typography variant="body1">Email: {electrician.email}</Typography>
        </div>
      ) : (
        <Alert severity="info">Electrician not found.</Alert>
      )}
    </Paper>
  );
};

export default ElectricianDetailsPage;