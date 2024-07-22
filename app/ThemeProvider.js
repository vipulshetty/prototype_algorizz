"use client";
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import theme from './theme';

const ThemeProvider = ({ children }) => {
  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
};

export default ThemeProvider;
