"use client";

import React from 'react';
import { Paper, Typography } from '@mui/material';
import ElectricianForm from '../Components/ElectricianForm';
import Layout from '../layout';

const AddElectricianPage = () => {
  const handleSave = (data) => {
    console.log('Electrician saved:', data);
    // Optionally, you can add more logic here to handle the saved data
  };

  return (
    <Layout>
      <Paper elevation={3} style={{ padding: '16px', marginTop: '20px' }}>
        <Typography variant="h5">Add Electrician</Typography>
        <ElectricianForm onSave={handleSave} />
      </Paper>
    </Layout>
  );
};

export default AddElectricianPage;
