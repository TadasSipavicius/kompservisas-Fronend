export interface IOrder{
    address: string;
    dateTime: string;
    description: string;
    email: string;
    firstName: string;
    id: number;
    name: string;
    phone: string;
    orderHistories: any[];
    workerId: number;
    price: number;
    status: string;
}