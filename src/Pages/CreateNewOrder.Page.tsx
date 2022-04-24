import { Button, Container, Divider, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import PageContainer from '../Layout/PageContainer';
import { availableWorkers } from '../data/availableWorkers';
import { useNavigate } from 'react-router-dom';

interface IWorker {
    workerID: number;
    workerName: string;
}

export default function CreateNewOrder() {

    const [selectedWorker, setSelectedWorker] = useState('');
    const navigate = useNavigate();

    const handleSelectChange = (event: SelectChangeEvent) => {
        setSelectedWorker(event.target.value as string);
    };

    const onSubmitFormClick = () => {
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
                        />
                        <TextField
                            label="Pavardė"
                            sx={{ marginBottom: 3, maxWidth: 550 }}
                        />
                        <TextField
                            label="E-mail'as"
                            sx={{ marginBottom: 3, maxWidth: 550 }}
                        />
                        <TextField
                            label="Telefono numeris"
                            sx={{ marginBottom: 3, maxWidth: 550 }}
                        />
                        <TextField
                            label="Adresas"
                            sx={{ marginBottom: 3, maxWidth: 550 }}
                        />
                    </Stack>
                    <Stack sx={{ marginTop: 3 }}>
                        <Typography>Informacija apie gedimą/problemą:</Typography>
                        <Divider sx={{ marginBottom: 3 }} />
                        <TextField
                            label="Gedimo/Problemos aprašymas"
                            rows={7}
                            multiline
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