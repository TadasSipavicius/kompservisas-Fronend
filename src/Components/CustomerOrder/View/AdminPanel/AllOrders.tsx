import { Box, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../../Styling/Components/OrderRow.scss'
import { getAllOrders } from '../../Controller/CustomerOrderController';
import { IOrder } from '../../Model/AllOrders';
export default function AllOrders(){

    const navigate = useNavigate();
    const [allOrders, setAllOrders] = useState<IOrder[]>([]);

    const onOrderClick = (item: string) => (e: any) =>{
        navigate(`/order/${item}`)
    }

    useEffect(() =>{
        const getTheAllUsers = async () =>{
            setAllOrders(await getAllOrders());
        }
        getTheAllUsers();
    }, []);

    const handleDateDisplay = (dateTime: string) =>{
        return dateTime.slice(0, 10);
    }

    return(
        <Box style={{marginTop: 15, marginBottom: 15}}>
            <Typography style={{fontSize: 15, fontWeight: 600, marginBottom: 5}}>
                Visi užsakymai:
            </Typography>
            {allOrders.map((item, index) => (
                <Grid className='rowContainer' container onClick={onOrderClick(item.name)}>
                    <Grid item style={{minWidth: 80, paddingLeft: 5, fontWeight: 600}}>{item.name}</Grid>
                    <Grid item style={{minWidth: 80, fontWeight: 600}}>{handleDateDisplay(item.dateTime)}</Grid>
                    <Grid item style={{minWidth: 100, fontWeight: 600}}>{item.status}</Grid>
                </Grid>
            ))}
        </Box>
    )
}