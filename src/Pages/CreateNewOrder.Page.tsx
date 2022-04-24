import { Button, Container, Divider, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import PageContainer from '../Layout/PageContainer';
import { availableWorkers } from '../data/availableWorkers';
import { useNavigate } from 'react-router-dom';
import { insertNewOrder } from '../Components/CustomerOrder/Controller/CustomerOrderController';

interface IWorker {
    workerID: number;
    workerName: string;
}

export default function CreateNewOrder() {

    const [selectedWorker, setSelectedWorker] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [description, setDescription] = useState('');
    //const [worker, setWorker] = useState(-1);
    const navigate = useNavigate();

    const handleFirstNameChange = (event: any) => {
        setFirstName(event.target.value);
    };

    const handleLastNameChange = (event: any) => {
        setLastName(event.target.value );
    };

    const handleEmailChange = (event: any) => {
        setEmail(event.target.value);
    };

    const handlePhoneChange = (event: any) => {
        setPhone(event.target.value);
    };

    const handleAddressChange = (event: any) => {
        setAddress(event.target.value);
    };

    const handleDescriptionChange = (event: any) => {
        setDescription(event.target.value);
    };

    const handleSelectChange = (event: SelectChangeEvent) => {
        console.log("even", typeof(event.target.value))
        setSelectedWorker(event.target.value as string);
    };


    const onSubmitFormClick = async () => {
        await insertNewOrder(firstName, lastName, email, phone, address, description, selectedWorker);
        navigate('/adminpanel')
    }

    return (
        <PageContainer>
            <Container>
                <Stack style={{ paddingBottom: 50 }}>
                    <Stack>
                        <Typography sx={{ maxWidth: 550 }} style={{ marginBottom: 2 }}>
                            Asmens kontaktiniai duomenys:
                        </Typography>
                        <Divider sx={{ marginBottom: 3, }} />
                        <TextField
                            label="Vardas"
                            sx={{ marginBottom: 3, maxWidth: 550 }}
                            value={firstName}
                            onChange={handleFirstNameChange}
                        />
                        <TextField
                            label="Pavardė"
                            sx={{ marginBottom: 3, maxWidth: 550 }}
                            value={lastName}
                            onChange={handleLastNameChange}
                        />
                        <TextField
                            label="E-mail'as"
                            sx={{ marginBottom: 3, maxWidth: 550 }}
                            value={email}
                            onChange={handleEmailChange}
                        />
                        <TextField
                            label="Telefono numeris"
                            sx={{ marginBottom: 3, maxWidth: 550 }}
                            value={phone}
                            onChange={handlePhoneChange}
                        />
                        <TextField
                            label="Adresas"
                            sx={{ marginBottom: 3, maxWidth: 550 }}
                            value={address}
                            onChange={handleAddressChange}
                        />
                    </Stack>
                    <Stack sx={{ marginTop: 3 }}>
                        <Typography>Informacija apie gedimą/problemą:</Typography>
                        <Divider sx={{ marginBottom: 3 }} />
                        <TextField
                            label="Gedimo/Problemos aprašymas"
                            rows={7}
                            multiline
                            value={description}
                            onChange={handleDescriptionChange}
                        />
                    </Stack>
                    <Stack sx={{ marginTop: 3 }}>
                        <Typography>Tvarkymo informacija:</Typography>
                        <Divider sx={{ marginBottom: 5 }} />
                        <FormControl>
                            <InputLabel id="laisvi-darbuotojai">Laisvi Darbuotojai</InputLabel>
                            <Select
                                labelId="laisvi-darbuotojai"
                                label="Laisvi Darbuotojai"
                                value={selectedWorker}
                                onChange={handleSelectChange}
                                key='worker-select'
                            >
                                {availableWorkers.map((worker: IWorker) => (
                                    <MenuItem key={worker.workerID} value={worker.workerID}>{worker.workerName}</MenuItem>
                                ))}
                                <MenuItem value={-1}>Nėra laisvo darbuotojo</MenuItem>
                            </Select>
                        </FormControl>
                    </Stack>
                    <Divider style={{ marginTop: 45, marginBottom: 10 }} />
                    <Button variant='contained' color='success' style={{ maxWidth: 180, height: 45 }} onClick={onSubmitFormClick}>Pateikti užsakymą</Button>
                </Stack>
            </Container>
        </PageContainer>
    )
}