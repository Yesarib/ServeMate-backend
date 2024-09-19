import mongoose, { ObjectId } from "mongoose";
import { ApiResponseDto } from "../dtos/api.dto";
import { CreateTableDto, UpdateTableDto } from "../dtos/table.dto"
import Table from "../models/table.model"
import createHttpError from "http-errors";


const createTable = async (tableData: CreateTableDto) => {
    const table = new Table(tableData);

    await table.save();

    return new ApiResponseDto(true, table);
}

const getCompanyTables = async (companyId: string) => {
    const objectId = new mongoose.Types.ObjectId(companyId);

    const tables = await Table.find({ companyId: objectId })

    return new ApiResponseDto(true, tables)
}

const getTableById = async (tableId: string) => {
    const objectId = new mongoose.Types.ObjectId(tableId);
    const table = await Table.findById(objectId);

    if (!table) {
        return createHttpError.NotFound('Table not found!')
    }

    return new ApiResponseDto(true, table)
}

const updateTable = async (tableId: string, tableData: UpdateTableDto) => {
    const objectId = new mongoose.Types.ObjectId(tableId);

    const table = await Table.findByIdAndUpdate(objectId, tableData);

    if (!table) {
        return createHttpError.NotFound('Table not found!')
    }

    return new ApiResponseDto(true, { message: 'Table successfully updated!' })
}

const changeTableStatus = async (tableId: string, status: string) => {
    const objectId = new mongoose.Types.ObjectId(tableId);

    const table = await Table.findById(objectId);

    if (!table) {
        return createHttpError.NotFound('Table not found!')
    }

    table.status = status;

    await table.save();

    return new ApiResponseDto(true, table)
}

const deleteTable = async (tableId: string) => {
    const objectId = new mongoose.Types.ObjectId(tableId);
    const table = await Table.findByIdAndDelete(objectId);
    if (!table) {
        return createHttpError.NotFound('Table not found!')
    }

    return new ApiResponseDto(true, { message: 'Table successfully deleted!' })
}

const tableService = {
    createTable,
    getCompanyTables,
    getTableById,
    changeTableStatus,
    deleteTable,
    updateTable
}

export default tableService;