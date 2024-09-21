import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct {
    productId: string;
    name: string;
    price: number;
    quantity: number
}

interface IOrder extends Document {
    tableId: string;
    companyId: string;
    products: IProduct[],
    status: string; // Payment status
    isNewOrder: boolean // Order status
    totalAmount: number;
    paymentMethod: string
}

const ProductSchema: Schema = new Schema({
    productId: { type: mongoose.Types.ObjectId, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, default: 1 }
});

const OrderSchema: Schema = new Schema({
    tableId: { type: mongoose.Types.ObjectId, required: true },
    companyId: { type: mongoose.Types.ObjectId, required: true },
    products: [ProductSchema],
    status: { type: String, default: 'payment pending' },
    isNewOrder: { type: Boolean, default: false },
    totalAmount: { type: Number, default: 0 },
    paymentMethod: { type: String, enum: ["cash", "creditCart"] }
})

const Order = mongoose.model<IOrder>('Order', OrderSchema);

export default Order;