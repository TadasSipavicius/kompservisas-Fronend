import Axios from 'axios';
import { IOrder } from '../Model/AllOrders';

export const getAllOrders = async () =>{
    var theData: IOrder[] = [];
    await Axios.get(`https://dapperaspnetcore20220424152102.azurewebsites.net/api/orders`)
        .then((response: any) =>{
        console.log("response", response)
        theData = response.data;
    });

    return theData;
}

export const getOneOrderById = async (id: any) => {
    var theData: IOrder = {address: "", dateTime: "", email: "", description: "", firstName: "", id: 0, name: "", orderHistories: [], phone: "", price: 0, status: "", workerId: 0, lastName: ""};

    await Axios.get(`https://dapperaspnetcore20220424152102.azurewebsites.net/api/orders/name/${id}`)
        .then((response: any) =>{
        console.log("response", response)
        theData = response.data;
    });
    return theData;
}

export const insertNewOrder = async (firstName: string, lastName: string, email: string, phone: string, address: string, description: string, selectedWorkerId: string) =>{
    console.log("selectedWorkerId")
    await Axios.post(`https://dapperaspnetcore20220424152102.azurewebsites.net/api/orders`, {
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        address: address,
        description: description,
        workerId: parseInt(selectedWorkerId)
    });
}