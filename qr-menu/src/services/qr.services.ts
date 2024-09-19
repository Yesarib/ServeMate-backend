import createHttpError from "http-errors";
import { CreateQRDto } from "../dtos/qr.dto"
import QRCodeModel from '../models/qr.model'
import { ApiResponseDto } from "../dtos/api.dto";
import { generateQrCode, getQrCodeData } from "../utils/qr.utils";

const createQrCode = async (qrData: CreateQRDto) => {
    try {
        const filePath = await generateQrCode(qrData);

        console.log(`QR code ${filePath} saved.`);

        const newQrCode = new QRCodeModel({
            tableId: qrData.tableId,
            companyId: qrData.companyId,
            qrCodePath: filePath
        });

        await newQrCode.save();
        return new ApiResponseDto(true, newQrCode);
    } catch (err) {
        console.error(err);
        throw createHttpError(500, 'There was an error generating the QR code!');
    }
}

const readQrCode = async (filePath: string) => {
    try {
        const qrCodeData = await getQrCodeData(filePath);

        console.log(qrCodeData);
        return new ApiResponseDto(true, qrCodeData)

    } catch (error) {
        console.error(error);
        throw createHttpError(500, 'There was an error read the QR code!');
    }
}

const qrCodeService = {
    createQrCode,
    readQrCode
}

export default qrCodeService