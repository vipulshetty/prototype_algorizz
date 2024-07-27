// components/IssueList.js

import React from 'react';
import { Button, List, ListItem, ListItemText } from '@mui/material';

const IssueList = ({ issues, onDelete }) => {
  const handleDelete = async (id) => {
    try {
      await fetch(`/api/issues/${id}`, {
        method: 'DELETE',
      });
      onDelete(id); // Update parent component's state
    } catch (error) {
      console.error('Failed to delete issue:', error);
    }
  };

  return (
    <List>
      {issues.map((issue) => (
        <ListItem key={issue._id}>
          <ListItemText
            primary={`${issue.category}: ${issue.description}`}
            secondary={`Customer: ${issue.name}, Address: ${issue.address}, Assigned Electrician: ${issue.electrician || 'Unassigned'}`}
          />
          <Button onClick={() => handleDelete(issue._id)} variant="contained" color="error">
            Delete
          </Button>
        </ListItem>
      ))}
    </List>
  );
};

export default IssueList;
