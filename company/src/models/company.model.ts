import { Schema, model } from 'mongoose';

const companySchema = new Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    contactNumber: { type: String, required: true },
    email: { type: String, required: true, unique: true },
}, { timestamps: true })


const Company = model('Company', companySchema);
export default Company;