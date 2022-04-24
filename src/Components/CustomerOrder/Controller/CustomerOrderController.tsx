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