import React from 'react';
import { Container, CssBaseline } from '@mui/material';
import Layout from './components/Layout';
import { BrowserRouter } from 'react-router-dom';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

export default function App() {
  return (
    <BrowserRouter>
      <CssBaseline />
      <Container maxWidth="md">
        <Layout />
      </Container>
    </BrowserRouter>
  );
}
