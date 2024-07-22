"use client";
import { List, ListItem, ListItemText, Button } from '@mui/material';

const IssueList = ({ issues, deleteIssue }) => (
  <List>
    {issues.map((issue, index) => (
      <ListItem key={index}>
        <ListItemText
          primary={issue.description}
          secondary={`Customer: ${issue.customerName}, Address: ${issue.customerAddress}, Status: ${issue.status}`}
        />
        <Button onClick={() => deleteIssue(index)} color="secondary">
          Delete
        </Button>
      </ListItem>
    ))}
  </List>
);

export default IssueList;
