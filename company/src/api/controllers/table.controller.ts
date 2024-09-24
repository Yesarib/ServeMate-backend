import { RequestHandler } from "express";
import tableService from "../../services/table.services";


const createTable:RequestHandler = async(req,res,next) => {
    try {
        const tableData = req.body;

        const result = await tableService.createTable(tableData);

        res.status(201).json(result)
    } catch (error) {
        next(error)
    }
}

const getCompanyTables:RequestHandler = async(req,res,next) => {
    try {
        const { company } = req.query

        if (typeof company !== 'string') {
            return res.status(400).json({ error: 'Invalid company ID' });
        }

        const tables = await tableService.getCompanyTables(company);

        res.status(200).json(tables)
    } catch (error) {
        next(error)
    }
}

const getTableById:RequestHandler = async(req,res,next) => {
    try {
        const { tableId } = req.params;

        const table = await tableService.getTableById(tableId);

        res.status(200).json(table)
    } catch (error) {
        next(error)
    }
}

const changeTableStatus:RequestHandler = async(req,res,next) => {
    try {
        const { tableId } = req.params;
        const { status } = req.body;

        const result = await tableService.changeTableStatus(tableId,status);
        res.status(200).json(result)
    } catch (error) {
        next(error)
    }
}

const updateTable:RequestHandler = async(req,res,next) => {
    try {
        const { tableId } = req.params;
        const tableData = req.body;

        const result = await tableService.updateTable(tableId,tableData);
        res.status(201).json(result)
    } catch (error) {
        next(error)
    }
}

const deleteTable:RequestHandler = async(req,res,next) => {
    try {
        const { tableId } = req.params;

        const result = await tableService.deleteTable(tableId);
        res.status(200).json(result)
    } catch (error) {
        next(error)
    }
}

const tableController = {
    createTable,
    getCompanyTables,
    getTableById,
    changeTableStatus,
    updateTable,
    deleteTable
}

export default tableController;