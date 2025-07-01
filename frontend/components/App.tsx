import React from 'react';
import ChatPage from '../pages/ChatPage';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from '../theme';
import '../global.css';

// App entry point: wraps the chat page with Material UI theme and baseline CSS
const App: React.FC = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <ChatPage />
  </ThemeProvider>
);

export default App;
