import mongoose, { Document, Schema } from 'mongoose';

interface IProduct {
  name: string;
  description: string;
  price: number;
}

interface ICategory extends Document {
  name: string;
  products: IProduct[];
  imagePath: string;
  companyId: string;
}

const ProductSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true }
});

const CategorySchema: Schema = new Schema({
  name: { type: String, required: true },
  imagePath: { type: String, default: "p.png" },
  products: [ProductSchema],
  companyId: { type: mongoose.Types.ObjectId, required: true }
}, { timestamps: true });

const CategoryModel = mongoose.model<ICategory>('Category', CategorySchema);

export default CategoryModel;