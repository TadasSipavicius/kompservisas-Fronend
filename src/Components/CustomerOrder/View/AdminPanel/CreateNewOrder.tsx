import { Button, Container, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function CreateNewOrder(){
    const navigate = useNavigate();
    
    const onCreateClick = () => {
        navigate(`/createneworder`);
    }
    
    return(
        <Container style={{display: "flex", marginBottom: 10, marginTop: 10, paddingLeft: 0}}>
        <Container style={{display: "flex", flexDirection: "row", border: "1px solid black", maxWidth: 400, paddingTop: 8, paddingBottom: 8, float: "left", paddingLeft: 10, paddingRight: 10, justifyContent: "space-between", margin: 0}}>
            <Typography style={{display: "flex", alignItems: "center"}}>Sukurti naują užsakymą</Typography>
            <Button style={{borderRadius: 30, margin: 0, paddingTop: 5, paddingBottom: 3 }} variant="outlined" onClick={onCreateClick}>
                Sukurti
            </Button>
        </Container>
        </Container>
        
    )
}