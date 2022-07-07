import React from 'react';
import { Container, CssBaseline } from '@mui/material';
import Layout from './components/Layout';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <CssBaseline />
        <Container maxWidth="md">
          <Layout />
        </Container>
      </BrowserRouter>
    </Provider>
  );
}
