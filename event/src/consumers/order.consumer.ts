import { connect } from "../config/rabbitmq";
import { IProduct, sendOrderInfo } from "../services/sendOrder.services";

interface OrderData {
    orderData: {
        companyId: string;
        tableId: string;
        products: IProduct[];
    }
}

export async function start() {
    const channel = await connect();
    const queue = 'order_info';
    await channel.assertQueue(queue, { durable: true });
    console.log(`Waiting for orders in ${queue}`);

    channel.consume(queue, async (data) => {
        try {
            if (data !== null) {
                const parsedData = JSON.parse(data.content.toString());

                if (!parsedData.orderData ||
                    typeof parsedData.orderData.companyId !== 'string' ||
                    typeof parsedData.orderData.tableId !== 'string' ||
                    !Array.isArray(parsedData.orderData.products)
                ) {
                    throw new Error("Invalid data format");
                }

                const orderData = parsedData.orderData;

                await sendOrderInfo(orderData.companyId, orderData.tableId, orderData.products);
                channel.ack(data);
            }
        } catch (err) {
            console.error("Error processing message:", err);
            if (data) {
                channel.nack(data);
            }
        }
    });
}


