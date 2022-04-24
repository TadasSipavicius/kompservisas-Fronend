import { Box, Grid, Typography } from '@mui/material';
import Axios from 'axios';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {allOrders} from '../../../../data/orders';
import '../../../../Styling/Components/OrderRow.scss'
export default function AllOrders(){

    const navigate = useNavigate();
    const onOrderClick = (item: string) => (e: any) =>{
        navigate(`/order/${item}`)
    }

    useEffect(() =>{
        Axios.get(`https://dapperaspnetcore20220424152102.azurewebsites.net/api/orders`).then((response: any) =>{
            console.log(" REZAS", response);
        });
    }, []);

    return(
        <Box style={{marginTop: 15, marginBottom: 15}}>
            <Typography style={{fontSize: 15, fontWeight: 600, marginBottom: 5}}>
                Visi užsakymai:
            </Typography>
            {allOrders.map((item, index) => (
                <Grid className='rowContainer' container onClick={onOrderClick(item.name)}>
                    <Grid item style={{minWidth: 80, paddingLeft: 5, fontWeight: 600}}>{item.name}</Grid>
                    <Grid item style={{minWidth: 80, fontWeight: 600}}>{item.createdTime}</Grid>
                    <Grid item style={{minWidth: 100, fontWeight: 600}}>{item.status}</Grid>
                </Grid>
            ))}
        </Box>
    )
}