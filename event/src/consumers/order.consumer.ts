import { connect } from "../config/rabbitmq";
import { IProduct, sendOrderInfo } from "../services/sendOrder.services";

interface OrderData {
    companyId: string,
    tableId: string,
    products: IProduct[]
}

export async function start() {
    const channel = await connect()
    const queue = 'order_info'
    await channel.assertQueue(queue, { durable: true });
    console.log(`Waiting for orders in ${queue}`);

    channel.consume(queue, async (data) => {
        if (data !== null) {
            console.log(data.content.toString());
            const orderData: OrderData = JSON.parse(data.content.toString());
            await sendOrderInfo(orderData.companyId, orderData.tableId, orderData.products);
            channel.ack(data)
        }
    })
}

