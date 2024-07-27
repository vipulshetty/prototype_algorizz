// components/ElectricianList.js
import { useEffect, useState } from 'react';
import { List, ListItem, ListItemText, Button, CircularProgress, Alert } from '@mui/material';

const ElectricianList = ({ onDeleteElectrician }) => {
  const [electricians, setElectricians] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchElectricians = async () => {
      try {
        const response = await fetch('/api/electricians');
        if (!response.ok) throw new Error('Failed to fetch data');
        const data = await response.json();
        setElectricians(data);
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
      await fetch('/api/electricians', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      setElectricians(electricians.filter(e => e._id !== id)); // Update UI
      onDeleteElectrician(id); // Notify parent component
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <List>
      {electricians.map((electrician) => (
        <ListItem key={electrician._id} secondaryAction={
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleDelete(electrician._id)}
          >
            Delete
          </Button>
        }>
          <ListItemText
            primary={`Name: ${electrician.name}`}
            secondary={`Expertise: ${electrician.expertise}, Contact: ${electrician.contact}`}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default ElectricianList;
