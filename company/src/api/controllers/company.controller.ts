import { RequestHandler } from "express";
import companyService from "../../services/company.services";
import { ObjectId } from "mongoose";


const createCompany: RequestHandler = async (req, res, next) => {
    try {
        const companyData = req.body;

        const result = await companyService.createCompany(companyData);

        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
}

const getAllCompanies: RequestHandler = async (req, res, next) => {
    try {
        const companies = await companyService.getAllCompanies();

        res.status(200).json(companies)
    } catch (error) {
        next(error)
    }
}

const getCompanyById: RequestHandler<{ companyId: ObjectId }> = async (req, res, next) => {
    try {
        const { companyId } = req.params
        const company = await companyService.getCompanyById(companyId);

        res.status(200).json(company)
    } catch (error) {
        next(error)
    }
}

const updateCompany: RequestHandler<{ companyId: string }> = async (req, res, next) => {
    try {
        const { companyId } = req.params;
        const companyData = req.body
        const result = await companyService.updateCompany(companyId, companyData)

        res.status(201).json(result)
    } catch (error) {
        next(error)
    }
}

const deleteCompany: RequestHandler<{ companyId: ObjectId }> = async (req, res, next) => {
    try {
        const { companyId } = req.params;
        const result = await companyService.deleteCompany(companyId)

        res.status(200).json(result)
    } catch (error) {
        next(error)
    }
}


const companyController = {
    createCompany,
    getAllCompanies,
    getCompanyById,
    updateCompany,
    deleteCompany
}

export default companyController;