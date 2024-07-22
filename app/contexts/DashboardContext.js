"use client";
import { createContext, useContext, useState } from 'react';

const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const [electricians, setElectricians] = useState([]);
  const [issues, setIssues] = useState([]);

  const addElectrician = (electrician) => {
    setElectricians((prev) => [...prev, electrician]);
  };

  const addIssue = (issue) => {
    const assignedIssue = assignIssue(issue);
    setIssues((prev) => [...prev, assignedIssue]);
  };

  const assignIssue = (issue) => {
    setElectricians((prevElectricians) => {
      const availableElectrician = prevElectricians.find(e => e.status === 'Available');
      if (availableElectrician) {
        issue.electrician = availableElectrician.name;
        availableElectrician.assignedIssues += 1;
        if (availableElectrician.assignedIssues >= 5) {
          availableElectrician.status = 'Busy';
        }
      }
      return [...prevElectricians];
    });
    return issue;
  };

  return (
    <DashboardContext.Provider value={{ electricians, issues, addElectrician, addIssue }}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => useContext(DashboardContext);
