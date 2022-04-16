import { Stack } from '@fluentui/react';
import React from 'react';
import './App.css';
import HomePage from './Pages/Home.Page';
import AdminPanel from './Pages/AdminPanel.Page';
import NotFound from './Pages/NotFount.Page'

import NavigationBar from './Layout/NavigationBar';
import { Typography } from '@mui/material';
import {Route, Routes} from 'react-router-dom';
import Order from './Pages/Order.Page';
import CreateNewOrder from './Pages/CreateNewOrder.Page';
import ScrollToTop from './Layout/ScrollToTop';

function App() {
  return (
    <Stack>
      <NavigationBar />
      <ScrollToTop />
      <React.Suspense fallback={<Typography style={{textAlign: "center"}}>Loading...</Typography>}>
          <Routes>
            <Route path='/' element={<HomePage />}/>
            <Route path='/adminpanel' element={<AdminPanel />} />
            <Route path='/order/:id' element={<Order />}/>
            <Route path='/createneworder' element={<CreateNewOrder />} />
            <Route path='*' element={<NotFound />}/>
          </Routes>
        </React.Suspense>
    
    </Stack>
  );
}

export default App;
