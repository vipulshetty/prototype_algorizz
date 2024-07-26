// contexts/DashboardContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const DashboardContext = createContext();

export const useDashboard = () => useContext(DashboardContext);

export const DashboardProvider = ({ children }) => {
  const [electricians, setElectricians] = useState([]);
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    // Fetch electricians and issues from your API
    const fetchData = async () => {
      try {
        const [electricianRes, issueRes] = await Promise.all([
          fetch('/api/electricians'),
          fetch('/api/issues'),
        ]);

        if (!electricianRes.ok || !issueRes.ok) {
          throw new Error('Failed to fetch data');
        }

        const [electricianData, issueData] = await Promise.all([
          electricianRes.json(),
          issueRes.json(),
        ]);

        setElectricians(electricianData);
        setIssues(issueData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <DashboardContext.Provider value={{ electricians, issues }}>
      {children}
    </DashboardContext.Provider>
  );
};
