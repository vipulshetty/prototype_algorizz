import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { List, ListItem, ListItemText, Button, CircularProgress, Alert } from '@mui/material';
import { useRouter } from 'next/router';

const ElectricianList = ({ onDeleteElectrician }) => {
  const [electricians, setElectricians] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchElectricians = async () => {
      try {
        const response = await axios.get('/api/electricians');
        setElectricians(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchElectricians();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/electricians/${id}`);
      setElectricians(electricians.filter(e => e._id !== id)); // Update UI
      onDeleteElectrician(id); // Notify parent component
    } catch (error) {
      setError(error.message);
    }
  };

  const handleClick = (id) => {
    router.push(`/electricians/${id}`);
  };

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <List>
      {electricians.map((electrician) => (
        <ListItem 
          key={electrician._id} 
          secondaryAction={
            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleDelete(electrician._id)}
            >
              Delete
            </Button>
          }
          onClick={() => handleClick(electrician._id)}
        >
          <ListItemText
            primary={`Name: ${electrician.name}`}
            secondary={`Expertise: ${electrician.expertise}, Contact: ${electrician.contact}, Assigned Issues: ${electrician.assignedIssues || 0}, Solved Complaints: ${electrician.solvedComplaints || 0}`}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default ElectricianList;
