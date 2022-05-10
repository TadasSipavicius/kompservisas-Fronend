import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PageContainer from '../Layout/PageContainer';
import { Divider, Stack, Typography, Button, TextField, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Dialog, DialogTitle, DialogActions } from '@mui/material';
import OrderImage from '../Images/OrderImage.png';
import { deleteOrder, getOneOrderById, insertHistoryInOrder } from '../Components/CustomerOrder/Controller/CustomerOrderController';
import { IOrder } from '../Components/CustomerOrder/Model/AllOrders';

export default function Order() {

    const params = useParams();
    const navigate = useNavigate();
    const [isAddHistoryFormIsOpen, setIsAddHistoryFormIsOpen] = useState({ status: false, commentText: "", statusText: "", price: "" });
    const [afterAPIChanged, setAfterAPIChanged] = useState(false);
    const [deleteDialog, setDeleteDialog] = useState(false)
    const [order, setOrder] = useState<IOrder>({address: "", dateTime: "", email: "", description: "", firstName: "", id: 0, name: "", orderHistories: [], phone: "", price: 0, status: "", workerId: 0, lastName: ""})

    useEffect(() => {
        const getOrder = async () => {
            var theOrder = await getOneOrderById(params.id);
            setOrder(theOrder);
        }
        getOrder();
    }, [params.id, afterAPIChanged])


    const onDisplayHistoryForm = () => {
        setIsAddHistoryFormIsOpen({ status: !isAddHistoryFormIsOpen.status, statusText: "", commentText: "", price: "" });
    }

    const onDisplayConfirmedHistoryForm = () => {
        setIsAddHistoryFormIsOpen({ status: !isAddHistoryFormIsOpen.status, statusText: "Patvirtintas", commentText: "", price: "" });
    }

    const onStatusChange = (e: any) => {
        setIsAddHistoryFormIsOpen({ ...isAddHistoryFormIsOpen, statusText: e.target.value });
    }

    const onCommentChange = (e: any) => {
        setIsAddHistoryFormIsOpen({ ...isAddHistoryFormIsOpen, commentText: e.target.value });
    }

    const onPriceChange = (e: any) =>{
        setIsAddHistoryFormIsOpen({ ...isAddHistoryFormIsOpen, price: e.target.value });
    }

    const onDeleteButtonClick = () => {
        setDeleteDialog(!deleteDialog);
    }

    const handleDialogClose = () => {
        setDeleteDialog(false);
    }

    const handleDeleteOrder = async () => {
        await deleteOrder(order.name);
        navigate(`/adminpanel`);
    }
    
    const handleDateDisplay = (dateTime: string) =>{
        return dateTime.slice(0, 10);
    }

    const handleDateDisplayWithHours = (dateTime: string) =>{
        return dateTime.slice(0, 10) + " " + dateTime.slice(11, 16);
    }
    const submitHistoryForm = async () => {
        await insertHistoryInOrder(order.name, order.id, isAddHistoryFormIsOpen.statusText, isAddHistoryFormIsOpen.commentText, isAddHistoryFormIsOpen.price);
        setAfterAPIChanged(!afterAPIChanged);
        setIsAddHistoryFormIsOpen({ status: false, statusText: "", commentText: " ", price: "" })
    }

    return (
        <PageContainer>
            <Typography style={{ borderBottom: "1px solid black", marginTop: 20 }}>Užsakymas: {order?.name}</Typography>
            <Stack style={{ marginTop: 15, display: "flex", flexDirection: "row" }}>
                <img src={OrderImage} alt='Order_image' style={{ height: 250, width: 250 }} />
                <Stack style={{ marginLeft: 25 }}>
                    <Stack style={{ display: "flex", flexDirection: "row", marginTop: 30, marginBottom: 3 }}>
                        <Stack style={{ width: 150, fontWeight: 600 }}>Užsakymo ID: </Stack>
                        <Stack>{order?.name}</Stack>
                    </Stack>
                    <Divider />
                    <Stack style={{ display: "flex", flexDirection: "row", marginTop: 50, marginBottom: 3 }}>
                        <Stack style={{ width: 150, fontWeight: 600 }}>Būsena: </Stack>
                        <Stack>{order?.status}</Stack>
                    </Stack>
                    <Divider />
                    <Stack style={{ display: "flex", flexDirection: "row", marginTop: 50, marginBottom: 3 }}>
                        <Stack style={{ width: 150, fontWeight: 600 }}>Priėmimo data: </Stack>
                        <Stack>{handleDateDisplay(order.dateTime)}</Stack>
                    </Stack>
                    <Divider />
                </Stack>
                <Stack style={{ marginLeft: 55 }}>
                    <Stack style={{ display: "flex", flexDirection: "row", marginTop: 30, marginBottom: 3 }}>
                        <Stack style={{ width: 150, fontWeight: 600 }}>Vardas Pavardė: </Stack>
                        <Stack>{order?.firstName + " " + order?.lastName}</Stack>
                    </Stack>
                    <Divider />
                    <Stack style={{ display: "flex", flexDirection: "row", marginTop: 50, marginBottom: 3 }}>
                        <Stack style={{ width: 150, fontWeight: 600 }}>Telefonas: </Stack>
                        <Stack>{order?.phone}</Stack>
                    </Stack>
                    <Divider />
                    <Stack style={{ display: "flex", flexDirection: "row", marginTop: 50, marginBottom: 3 }}>
                        <Stack style={{ width: 150, fontWeight: 600 }}>Adresas: </Stack>
                        <Stack>{handleDateDisplay(order?.address)}</Stack>
                    </Stack>
                    <Divider />
                </Stack>
            </Stack>
            {order.status === "Patvirtintas" ? (
                <Stack style={{marginTop: 25, display: "flex", flexDirection: "row"}}>
                    <Stack style={{fontWeight: 900}}>Užsakymo kaina:</Stack>
                    <Stack style={{marginLeft: 20, fontWeight: 600, textDecoration: "underline"}}>{order.price} eurų</Stack>
                </Stack>
            ) : null}
            <Typography style={{ borderBottom: "1px solid black", marginTop: 20 }}>Užsakymo istorija:</Typography>
            <Button style={{ marginTop: 10 }} variant='contained' onClick={onDisplayHistoryForm}>
                Pakeisti Užsakymo istoriją:
            </Button>
            {order.status !== "Patvirtintas" ? (
                <Button style={{ marginTop: 10, marginLeft: 10 }} variant='contained' color='success' onClick={onDisplayConfirmedHistoryForm}>
                    Patvirtinti atliktą užsakymą
                </Button>
            ) : null}
            {isAddHistoryFormIsOpen.status ? (
                <Stack style={{ maxWidth: 400, border: "1px solid gray", padding: 20, marginTop: 10 }}>
                    <label style={{ fontSize: 15, fontWeight: 500, fontStyle: "italic" }}>Būsena:</label>
                    {isAddHistoryFormIsOpen.statusText === "Patvirtintas" ?
                        (<TextField style={{ marginBottom: 20 }} value={isAddHistoryFormIsOpen.statusText} disabled />) :
                        (<TextField style={{ marginBottom: 20 }} value={isAddHistoryFormIsOpen.statusText} onChange={onStatusChange} />)
                    }
                    <label style={{ fontSize: 15, fontWeight: 500, fontStyle: "italic" }}>Komentaras:</label>
                    <TextField multiline rows={5} value={isAddHistoryFormIsOpen.commentText} onChange={onCommentChange} />
                    {isAddHistoryFormIsOpen.statusText === "Patvirtintas" ? (
                        <>
                            <label style={{ fontSize: 15, fontWeight: 500, fontStyle: "italic" }}>Kaina:</label>
                            <TextField style={{ marginBottom: 20 }} value={isAddHistoryFormIsOpen.price} onChange={onPriceChange}/>
                        </>    
                    ) :null}
                    <Button style={{ width: 100, marginTop: 10 }} variant='contained' onClick={submitHistoryForm}>
                        Pridėti
                    </Button>
                </Stack>
            ) : null}

            <Stack style={{marginTop: 25, marginBottom: 15}}>
                <label style={{ fontSize: 17, fontWeight: 500, fontStyle: "italic" }}>Gedimo aprašymas:</label>
                <Stack style={{marginTop: 5, maxWidth: 650, wordBreak: "break-all"}}>{order.description}</Stack>
            </Stack>
            
            <TableContainer >
                <Table sx={{ maxWidth: 1000, marginTop: 3 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 600, fontSize: 16 }}>Laikas:</TableCell>
                            <TableCell sx={{ fontWeight: 600, fontSize: 16, minWidth: 400 }}>Komentaras:</TableCell>
                            <TableCell sx={{ fontWeight: 600, fontSize: 16 }}>Statusas:</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {order?.orderHistories.map(orderHistory => (
                            <TableRow key={orderHistory.time}>
                                <TableCell align="left">{handleDateDisplayWithHours(orderHistory.dateTime)}</TableCell>
                                <TableCell align="left">{orderHistory.comment}</TableCell>
                                <TableCell align="left">{orderHistory.status}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Button style={{ marginTop: 20, float: "right" }} variant='contained' color='error' onClick={onDeleteButtonClick}>
                Ištrinti užsakymą
            </Button>
            {deleteDialog ? (
                <Dialog
                    open={deleteDialog}
                    onClose={handleDialogClose}
                >
                    <DialogTitle id="alert-dialog-title">
                        Ar tikrai norite ištrinti užsakymą: {order?.name} ?
                    </DialogTitle>
                    <DialogActions>
                        <Button onClick={handleDialogClose} color='error' variant='outlined'>Ne</Button>
                        <Button onClick={handleDeleteOrder} autoFocus color='success' variant='contained'>Taip</Button>
                    </DialogActions>
                </Dialog>
            ) : null}
        </PageContainer>

    )
}