import { Button, Container, Input, InputAdornment, InputLabel } from '@mui/material';
import React, { useState } from 'react';
import BorderColorIcon from '@material-ui/icons/BorderColor'
import { useNavigate } from 'react-router-dom';
import {allOrders} from '../../../../data/orders'

export default function SearchOrderContainer(){
    const [searchInputText, setSearchInputText] = useState("");
    const [inputValidation, setInputValidation] = useState({isValide: true, text: ""});
    const navigate = useNavigate();

    const navigateToOrderPage = () => {
        navigate(`/order/${searchInputText}`);
    }
    
    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInputText(e.target.value)
    } 
    const isExist = () => {
        var filterByName = allOrders.filter(item => searchInputText === item.name)
        if(filterByName.length === 0){
            return false;
        }
        return true;
    }
    const onSearchClick = () => {
        if(searchInputText.length !== 6){
            setInputValidation({isValide: false, text: "Turi būti 6 simboliai"})
        } else if(isExist() === false){
            setInputValidation({isValide: false, text: "Nėra tokio užsakymo"})
        } else {
            navigateToOrderPage()
        }
    }
    return(
        <Container style={{border: "1px solid black", borderRadius: 30, paddingTop: 15, paddingBottom: 15}}>
            <Container>
            <InputLabel htmlFor="input-with-icon-adornment" style={{marginBottom: 5}}>Suraskite savo užsakymą:</InputLabel>
            <Input
            style={{minWidth: 300, fontSize: 14}}
            id="input-with-icon-adornment"
            placeholder='Įrašykite 6 simbolių numerį: pvz. SS0001'
            startAdornment={
                <InputAdornment position="start">
                  <BorderColorIcon />
                </InputAdornment>
              }   
            onChange={onInputChange}
            value={searchInputText}
            error={inputValidation.isValide === false}
            
          />
        </Container>
        <Container>
          <label style={{fontSize: 13, color: "red"}}>{inputValidation.text}</label>
          </Container>
          <Container style={{marginTop: 10}}>
          <Button variant="outlined" onClick={onSearchClick}>
              Ieškoti
          </Button>
          </Container>
          
        </Container>
    )
}