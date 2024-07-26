"use client";
import React from 'react';
import { Paper, Typography } from '@mui/material';
import ElectricianForm from '../Components/ElectricianForm';

export default function AddElectricianPage() {
  return (
    <Paper elevation={3} style={{ padding: '16px', marginTop: '20px' }}>
      <Typography variant="h5">Add Electrician</Typography>
      <ElectricianForm />
    </Paper>
  );
}
