import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PageContainer from '../Layout/PageContainer';
import {allOrders} from '../data/orders'
import { Divider, Stack, Typography, Button, TextField } from '@mui/material';
import OrderImage from '../Images/OrderImage.png';

interface IOrder{
    id: number;
    name: string;
    status: string;
    createdTime: string;
}

export default function Order(){    
    const params = useParams();
    
    //const [isAddHistoryButtonClicked, setIsAddButtonClicked] = useState(false);
    const [isAddHistoryFormIsOpen, setIsAddHistoryFormIsOpen] = useState(false);
    const [order, setOrder] = useState<IOrder>()

    useEffect(() => {
        allOrders.forEach(item => {
            if(item.name === params.id){
                setOrder(item)
            }
        })
    }, [params.id])

    const onDisplayHistoryForm = () =>{
        setIsAddHistoryFormIsOpen(!isAddHistoryFormIsOpen);
    }

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
            <Button style={{marginTop: 10}} variant='contained' onClick={onDisplayHistoryForm}>
                Pakeisti Užsakymo istoriją:
            </Button>
            {isAddHistoryFormIsOpen ? (
                <Stack style={{maxWidth: 400, border: "1px solid gray", padding: 20, marginTop: 10}}>
                    <label style={{fontSize: 15, fontWeight: 500, fontStyle: "italic"}}>Būsena:</label>
                    <TextField style={{marginBottom: 20}}/>
                    <label style={{fontSize: 15, fontWeight: 500, fontStyle: "italic"}}>Komentaras:</label>
                    <TextField multiline rows={5}/>
                    <Button style={{width: 100, marginTop: 10}} variant='contained' onClick={onDisplayHistoryForm}>
                        Pridėti
                    </Button>
                </Stack>
            ) : null}
        </PageContainer>
    )
}