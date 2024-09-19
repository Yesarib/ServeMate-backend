import { Schema, model } from 'mongoose';

// export interface User extends Document {
//     firstName: string,
//     lastName: string,
//     email: string,
//     password: string,

// }


const userSchema = new Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, require: true },
    phoneNumber: { type: String, required: true, unique: true },
    companyId: { type: Schema.Types.ObjectId, required: true }
}, { timestamps: true })


const User = model('User', userSchema);
export default User;