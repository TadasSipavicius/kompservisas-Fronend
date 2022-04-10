import { Box, Container, Divider } from '@mui/material';
import React from 'react';
import CreateNewOrder from '../Components/CustomerOrder/View/AdminPanel/CreateNewOrder';
import PageContainer from '../Layout/PageContainer';

export default function AdminPanel(){

    return(
        <PageContainer>
            <Container>
                <Box style={{marginBottom: 15, fontSize: 19, fontWeight: 900, marginTop: 5}}>
                    Administratoriaus panelė
                </Box>
                <Divider />
                <CreateNewOrder />
                <Divider />
            </Container>
        </PageContainer>
    )
}