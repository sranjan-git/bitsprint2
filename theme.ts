// src/theme.ts

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Blue color for primary elements
    },
    secondary: {
      main: '#dc004e', // Red color for secondary elements
    },
    background: {
      default: '#f4f6f8', // Light grey background
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 500,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
  },
  spacing: 8, // Default spacing unit
});

export default theme;
