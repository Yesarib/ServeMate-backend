import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTableDto {
    @IsNotEmpty()
    @IsString()
    companyId: string

    @IsNotEmpty()
    @IsString()
    tableNumber: string

    @IsNotEmpty()
    @IsString()
    status: string
}

export class UpdateTableDto {
    @IsNotEmpty()
    @IsString()
    tableNumber: string

    @IsNotEmpty()
    @IsString()
    status: string
}

export class PatchTableDto {
    @IsNotEmpty()
    @IsString()
    status: string
}