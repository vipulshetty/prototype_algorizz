"use client";
import { List, ListItem, ListItemText, Button } from '@mui/material';

const ElectricianList = ({ electricians, deleteElectrician }) => (
  <List>
    {electricians.map((electrician, index) => (
      <ListItem key={index}>
        <ListItemText
          primary={electrician.name}
          secondary={`Solved Complaints: ${electrician.solvedComplaints || 0}, Assigned Issues: ${electrician.assignedIssues || 0}`}
        />
        <Button onClick={() => deleteElectrician(index)} color="secondary">
          Delete
        </Button>
      </ListItem>
    ))}
  </List>
);

export default ElectricianList;
