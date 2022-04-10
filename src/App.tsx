import { Stack } from '@fluentui/react';
import React from 'react';
import './App.css';
import HomePage from './Pages/Home.Page';
import AdminPanel from './Pages/AdminPanel.Page';
import NotFound from './Pages/NotFount.Page'

import NavigationBar from './Layout/NavigationBar';
import { Typography } from '@mui/material';
import {Route, Routes} from 'react-router-dom';

function App() {
  return (
    <Stack>
      <NavigationBar />
      <React.Suspense fallback={<Typography style={{textAlign: "center"}}>Loading...</Typography>}>
          <Routes>
            <Route path='/' element={<HomePage />}/>
            <Route path='/adminpanel' element={<AdminPanel />} />
            <Route path='*' element={<NotFound />}/>
          </Routes>
        </React.Suspense>
    
    </Stack>
  );
}

export default App;
