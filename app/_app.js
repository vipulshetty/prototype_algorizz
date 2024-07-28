"use client";

import '../styles/globals.css';
import { DashboardProvider } from '../contexts/DashboardContext';

function MyApp({ Component, pageProps }) {
  return (
    <DashboardProvider>
      <Component {...pageProps} />
    </DashboardProvider>
  );
}

export default MyApp;
