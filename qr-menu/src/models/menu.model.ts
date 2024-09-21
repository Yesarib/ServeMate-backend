import mongoose, { Document, Schema } from 'mongoose';

interface IMenu extends Document {
  tableId: string;
  companyId: string;
  categoryIds: mongoose.Schema.Types.ObjectId[];
}

const MenuSchema: Schema = new Schema({
  tableId: { type: String, required: true },
  companyId: { type: String, required: true, unique: true },
  categoryIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }]
}, { timestamps: true });

const MenuModel = mongoose.model<IMenu>('Menu', MenuSchema);

export default MenuModel;
