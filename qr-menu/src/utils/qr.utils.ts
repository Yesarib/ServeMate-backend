import { CreateQRDto } from "../dtos/qr.dto";
import fs from 'fs';
import QRCode from 'qrcode'
const { Jimp } = require("jimp");
const QrCodeRead = require('qrcode-reader');
import path from 'path';

export const generateQrCode = async (qrData: CreateQRDto) => {
    const jsonQrData = JSON.stringify(qrData);
    const qrCodeUrl = `http://localhost:8083/servemate/${qrData.companyId}/${qrData.tableId}`;
    const timestamp = Date.now();
    const filePath = `./uploads/qrcodes/qr-code-${timestamp}.png`;

    if (!fs.existsSync('./uploads/qrcodes')) {
        fs.mkdirSync('./uploads/qrcodes', { recursive: true });
    }

    await QRCode.toFile(filePath, qrCodeUrl);

    return filePath;
}

export const getQrCodeData = async (filePath: string): Promise<string> => {
    try {
        const absolutePath = path.resolve(filePath);
        const image = await Jimp.read(absolutePath);
        const qr = new QrCodeRead();

        return new Promise((resolve, reject) => {
            qr.callback = (err: any, result: any) => {
                if (err) {
                    reject(new Error("QR code decoding error: " + err));
                }
                if (result) {
                    resolve(result.result);
                } else {
                    reject(new Error("QR code is empty or invalid."));
                }
            };

            qr.decode(image.bitmap);
        });
    } catch (error) {
        console.error("QR code reading error:", error);
        throw new Error("Failed to read QR code.");
    }
};