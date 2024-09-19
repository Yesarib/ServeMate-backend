import { Schema, model } from 'mongoose';

const tableSchema = new Schema({
    companyId: { type: Schema.Types.ObjectId, ref: 'Company', required: true },
    tableNumber: { type: String, required: true },
    status: { type: String, required: true, default: 'available' }
}, { timestamps: true })


const Table = model('Table', tableSchema);
export default Table;