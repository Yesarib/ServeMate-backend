import { getIO } from "../config/socketio";


export interface IProduct {
    productId: string;
    name: string;
    price: number;
    quantity: number
}

export const sendOrderInfo = async (companyId: string, tableId: string, products: IProduct[]) => {
    const io = getIO();

    const companyChannel = `company-${companyId}`;

    io.emit(companyChannel, { tableId, products });
}