import mongoose, { Document, Schema } from 'mongoose';

interface IMenuItem {
  name: string;
  description: string;
  price: number;
}

interface IMenu extends Document {
  tableId: string;
  companyId: string;
  items: IMenuItem[];
}

const MenuItemSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true }
});

const MenuSchema: Schema = new Schema({
  tableId: { type: String, required: true },
  companyId: { type: String, required: true },
  items: [MenuItemSchema]
});

const MenuModel = mongoose.model<IMenu>('Menu', MenuSchema);

export default MenuModel;
