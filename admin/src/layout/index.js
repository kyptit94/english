import React from 'react';
import Navbar from './navbar';
import Footer from './footer';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { Outlet } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));


const Layout = ({ children }) => (
  <Box sx={{ display: 'flex' }}>
    <CssBaseline />
    <Navbar >
      <Box
          component="main" sx={{ flexGrow: 1, p: 3 }}
        >
          <DrawerHeader />
          < Outlet />
      </Box>
    </Navbar>
    <Footer />
  </Box>
);

export default Layout;