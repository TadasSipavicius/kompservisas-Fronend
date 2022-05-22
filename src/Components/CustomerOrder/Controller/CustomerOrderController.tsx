import Axios from 'axios';
import { IOrder } from '../Model/AllOrders';
import { IWorker } from '../Model/Worker';

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

    await Axios.get(`https://dapperaspnetcore20220424152102.azurewebsites.net/api/orders/${id}/multipleresult`)
        .then((response: any) =>{
        console.log("response", response)
        theData = response.data;
    });
    return theData;
}

export const insertNewOrder = async (firstName: string, lastName: string, email: string, phone: string, address: string, description: string, selectedWorkerId: string) =>{
    console.log("selectedWorkerId", selectedWorkerId);
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

export const insertHistoryInOrder = async (orderName: string, orderId: number, status: string, comment: string, price: string, workerId: number) =>{
    console.log("price", parseFloat(price))
    if(price !== ""){
        await Axios.post(`https://dapperaspnetcore20220424152102.azurewebsites.net/api/orders/history`, {
            orderName: orderName,
            orderId: orderId,
            comment: comment,
            status: status,
            price: parseFloat(price),
            workerId: workerId
        })

    } else {
        await Axios.post(`https://dapperaspnetcore20220424152102.azurewebsites.net/api/orders/history`, {
            orderName: orderName,
            orderId: orderId,
            comment: comment,
            status: status,
            price: 0
        });
    }   
}

export const deleteOrder = async (id: any) =>{
    await Axios.delete(`https://dapperaspnetcore20220424152102.azurewebsites.net/api/orders/${id}`);
}

export const getAvailableWorkers = async () =>{
    var workers: IWorker[] = [];
    await Axios.get("https://dapperaspnetcore20220424152102.azurewebsites.net/api/workers/available")
    .then((response: any) =>{
        console.log("response", response)
        workers = response.data;
    });

    return workers;
}