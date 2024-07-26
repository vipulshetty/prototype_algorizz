// components/ElectricianList.js
import { useEffect, useState } from 'react';
import { List, ListItem, ListItemText, CircularProgress, Alert } from '@mui/material';

const ElectricianList = () => {
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

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <List>
      {electricians.map((electrician) => (
        <ListItem key={electrician._id}>
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
