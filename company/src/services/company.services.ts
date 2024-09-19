import mongoose, { ObjectId } from "mongoose";
import { ApiResponseDto } from "../dtos/api.dto";
import { CreateCompanyDto, UpdateCompanyDto } from "../dtos/company.dto";
import Company from "../models/company.model";
import createHttpError from "http-errors";

const createCompany = async (companyData: CreateCompanyDto) => {
    const isExist = await Company.findOne({ email: companyData.email });

    if (isExist) {
        throw createHttpError.Conflict('This company email already exist');
    }

    const company = new Company(companyData);

    await company.save();

    return new ApiResponseDto(true, company);
}

const getAllCompanies = async () => {
    const companies = await Company.find();

    return new ApiResponseDto(true, companies)
}

const getCompanyById = async (companyId: ObjectId) => {
    const company = await Company.findById(companyId);

    if (!company) {
        throw createHttpError.NotFound('Company not found!');
    }

    return new ApiResponseDto(true,company)
}

const updateCompany = async(companyId:string, companyData:UpdateCompanyDto) => {
    const objectId = new mongoose.Types.ObjectId(companyId);

    const company = await Company.findByIdAndUpdate(objectId, companyData, { new: true });

    if (!company) {
        throw createHttpError.NotFound('Company not found');
    }

    return new ApiResponseDto(true,{message:'Company successfully updated!'})
}

const deleteCompany = async(companyId:ObjectId) => {
    const company = await Company.findByIdAndDelete(companyId)

    if (!company) {
        throw createHttpError.NotFound('Company not found!');
    }

    return new ApiResponseDto(true,{message:'Company successfully deleted!'})
}

const companyService = {
    createCompany,
    getAllCompanies,
    getCompanyById,
    updateCompany,
    deleteCompany
}

export default companyService