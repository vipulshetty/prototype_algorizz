"use client";
import { DashboardProvider } from './contexts/DashboardContext';
import './globals.css';
import ThemeProvider from './ThemeProvider'; // Import the client-side ThemeProvider

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <DashboardProvider>
            {children}
          </DashboardProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
