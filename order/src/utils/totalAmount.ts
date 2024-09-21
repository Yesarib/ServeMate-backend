import { IProduct } from "../models/order.model";


export const calculateTotalAmount = async (products: IProduct[]) => {
    const total = products.reduce((accumulator, product) => {
        return accumulator + (product.price * product.quantity);
    }, 0);

    return total;
}