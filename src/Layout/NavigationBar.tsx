import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Navigation } from '../Navigations';
export default function NavigationBar(){
    const navigate = useNavigate();

    const logoNavigateOnClick = () => {
        navigate('/');
    }
    return(
        <AppBar position="static">
            <Toolbar style={{justifyContent: "space-between", marginRight: 50, marginLeft: 50}}>
                <Button style={{fontSize: 18, fontWeight: 600, color: "white"}} onClick={logoNavigateOnClick}>Kompservisas</Button>
                <Typography>
                    {Navigation.map((item) => (
                        <Link to={item.to} style={{color: "white", textDecoration: "none", fontWeight: 600, marginLeft: 25}} key={item.title}>
                            {item.title}
                        </Link>
                    ))}
                </Typography>
            </Toolbar>
        </AppBar>
    )
}