import { Container, Fade } from '@mui/material';
import React from 'react';

export default function PageContainer({ children }: any){

    return(
        <Fade in timeout={800}>
            <Container fixed style={{position: "relative", backgroundColor: "#C8C8C8", borderRadius: 40, marginTop: 10, marginBottom: 10, paddingTop: 15, minHeight: "100vh"}}>
                {children}
            </Container>
        </Fade>
    )
}