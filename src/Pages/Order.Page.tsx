import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PageContainer from '../Layout/PageContainer';
import { allOrders } from '../data/orders'
import { Divider, Stack, Typography, Button, TextField, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Dialog, DialogTitle, DialogActions } from '@mui/material';
import OrderImage from '../Images/OrderImage.png';

interface IHistory {
    time: string;
    comment: string;
    status: string;
}

interface IOrder {
    id: number;
    name: string;
    status: string;
    createdTime: string;
    history: IHistory[];
}

export default function Order() {

    const params = useParams();
    const [isAddHistoryFormIsOpen, setIsAddHistoryFormIsOpen] = useState({ status: false, commentText: "", statusText: "" });
    const [deleteDialog, setDeleteDialog] = useState(false)
    const [order, setOrder] = useState<IOrder>()

    useEffect(() => {
        allOrders.forEach(item => {
            if (item.name === params.id) {
                setOrder(item)
            }
        })
    }, [params.id])

    const onDisplayHistoryForm = () => {
        setIsAddHistoryFormIsOpen({ status: !isAddHistoryFormIsOpen.status, statusText: "", commentText: "" });
    }

    const onDisplayConfirmedHistoryForm = () => {
        setIsAddHistoryFormIsOpen({ status: !isAddHistoryFormIsOpen.status, statusText: "Patvirtintas", commentText: "" });
    }

    const onStatusChange = (e: any) => {
        setIsAddHistoryFormIsOpen({ ...isAddHistoryFormIsOpen, statusText: e.target.value });
    }

    const onCommentChange = (e: any) => {
        setIsAddHistoryFormIsOpen({ ...isAddHistoryFormIsOpen, commentText: e.target.value });
    }

    const onDeleteButtonClick = () => {
        setDeleteDialog(!deleteDialog);
    }

    const handleDialogClose = () => {
        setDeleteDialog(false);
    }

    const submitHistoryForm = () => {
        console.log("Status: ", isAddHistoryFormIsOpen.statusText);
        console.log("Comment: ", isAddHistoryFormIsOpen.commentText);
        setIsAddHistoryFormIsOpen({ status: false, statusText: "", commentText: "   " })
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
                        <Stack>{order?.createdTime}</Stack>
                    </Stack>
                    <Divider />
                </Stack>
            </Stack>
            <Typography style={{ borderBottom: "1px solid black", marginTop: 20 }}>Užsakymo istorija:</Typography>
            <Button style={{ marginTop: 10 }} variant='contained' onClick={onDisplayHistoryForm}>
                Pakeisti Užsakymo istoriją:
            </Button>
            <Button style={{ marginTop: 10, marginLeft: 10 }} variant='contained' color='success' onClick={onDisplayConfirmedHistoryForm}>
                Patvirtinti atliktą užsakymą
            </Button>
            {isAddHistoryFormIsOpen.status ? (
                <Stack style={{ maxWidth: 400, border: "1px solid gray", padding: 20, marginTop: 10 }}>
                    <label style={{ fontSize: 15, fontWeight: 500, fontStyle: "italic" }}>Būsena:</label>
                    {isAddHistoryFormIsOpen.statusText === "Patvirtintas" ?
                        (<TextField style={{ marginBottom: 20 }} value={isAddHistoryFormIsOpen.statusText} disabled />) :
                        (<TextField style={{ marginBottom: 20 }} value={isAddHistoryFormIsOpen.statusText} onChange={onStatusChange} />)
                    }
                    <label style={{ fontSize: 15, fontWeight: 500, fontStyle: "italic" }}>Komentaras:</label>
                    <TextField multiline rows={5} value={isAddHistoryFormIsOpen.commentText} onChange={onCommentChange} />
                    <Button style={{ width: 100, marginTop: 10 }} variant='contained' onClick={submitHistoryForm}>
                        Pridėti
                    </Button>
                </Stack>
            ) : null}
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
                        {order?.history.map(orderHistory => (
                            <TableRow key={orderHistory.time}>
                                <TableCell align="left">{orderHistory.time}</TableCell>
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
                        <Button onClick={handleDialogClose} autoFocus color='success' variant='contained'>Taip</Button>
                    </DialogActions>
                </Dialog>
            ) : null}
        </PageContainer>

    )
}