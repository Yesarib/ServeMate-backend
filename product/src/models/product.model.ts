import mongoose, { Document, Schema } from 'mongoose';

interface IProduct extends Document {
    name: string;
    description: string;
    imagePath: string;
    price: number;
    companyId: string;
}

const ProductSchema: Schema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    imagePath: {
        type: String, required: true,
        default: "https://cdn2.iconfinder.com/data/icons/admin-tools-2/25/image2-512.png"
    },
    price: { type: Number, required: true, default: 0 },
    companyId: { type: String, required: true }
})

const Product = mongoose.model<IProduct>('Product', ProductSchema);

export default Product