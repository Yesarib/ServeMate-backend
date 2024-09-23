import { connect } from "../config/rabbitmq";
import { IProduct } from "../models/order.model"

interface OrderData {
    companyId: string,
    tableId: string,
    products: IProduct[]
}

export const sendOrderInfo = async (orderData: OrderData) => {
    try {
        const channel = await connect()
        const queue = 'order_info'
        await channel.assertQueue(queue, { durable: true })

        await channel.sendToQueue(queue, Buffer.from(
            JSON.stringify({
                orderData
            })
        ))
    } catch (error) {
        console.log(error);
        throw error
    }
}