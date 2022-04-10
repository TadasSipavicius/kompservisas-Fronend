import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PageContainer from '../Layout/PageContainer';
import {allOrders} from '../data/orders'
import { Divider, Stack, Typography } from '@mui/material';
import OrderImage from '../Images/OrderImage.png';

interface IOrder{
    id: number;
    name: string;
    status: string;
    createdTime: string;
}

export default function Order(){    
    const params = useParams();

    const [order, setOrder] = useState<IOrder>()
    useEffect(() => {
        allOrders.forEach(item => {
            if(item.name === params.id){
                setOrder(item)
            }
        })
    }, [params.id])

    return(
        <PageContainer>
            <Typography style={{borderBottom: "1px solid black", marginTop: 20}}>Užsakymas: {order?.name}</Typography>
            <Stack style={{marginTop: 15, display: "flex", flexDirection: "row"}}>
                <img src={OrderImage} alt='Order_image'  style={{height: 250, width: 250}}/>
                <Stack style={{marginLeft: 25}}>
                    <Stack style={{display: "flex", flexDirection: "row", marginTop: 30, marginBottom: 3}}>
                        <Stack style={{width: 150, fontWeight: 600}}>Užsakymo ID: </Stack>
                        <Stack>{order?.name}</Stack>
                    </Stack>
                    <Divider />
                    <Stack style={{display: "flex", flexDirection: "row", marginTop: 50, marginBottom: 3}}>
                        <Stack style={{width: 150, fontWeight: 600}}>Būsena: </Stack>
                        <Stack>{order?.status}</Stack>
                    </Stack>
                    <Divider />
                    <Stack style={{display: "flex", flexDirection: "row", marginTop: 50, marginBottom: 3}}>
                        <Stack style={{width: 150, fontWeight: 600}}>Priėmimo data: </Stack>
                        <Stack>{order?.createdTime}</Stack>
                    </Stack>
                    <Divider />
                </Stack>
            </Stack>
            <Typography style={{borderBottom: "1px solid black", marginTop: 20}}>Užsakymo istorija:</Typography>
        </PageContainer>
    )
}