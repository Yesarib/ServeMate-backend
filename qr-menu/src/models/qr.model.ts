import mongoose, { Document, Schema } from 'mongoose';

interface IQRCode extends Document {
  tableId: string;
  companyId: string;
  qrCodePath: string;
}

const QRCodeSchema: Schema = new Schema({
  tableId: { type: String, required: true },
  companyId: { type: String, required: true },
  qrCodePath: { type: String, required: true }
}, { timestamps: true });

const QRCode = mongoose.model<IQRCode>('QRCode', QRCodeSchema);

export default QRCode;
