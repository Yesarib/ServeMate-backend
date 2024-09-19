import { RequestHandler } from "express";
import qrCodeService from "../services/qr.services";


const createQrCode: RequestHandler = async (req, res, next) => {
    try {
        const qrData = req.body;

        const result = await qrCodeService.createQrCode(qrData);

        res.status(200).json(result)
    } catch (error) {
        next(error)
    }
}

const readQrCode: RequestHandler = async (req, res, next) => {
    try {
        const { filePath } = req.body;

        const result = await qrCodeService.readQrCode(filePath);

        res.status(200).json(result)
    } catch (error) {
        next(error)
    }
}

const qrCodeController = {
    createQrCode,
    readQrCode
}

export default qrCodeController;