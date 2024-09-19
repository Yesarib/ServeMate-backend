import { IsNotEmpty, IsString } from 'class-validator';

export class CreateQRDto {
    @IsNotEmpty()
    @IsString()
    tableId: string

    @IsNotEmpty()
    @IsString()
    companyId: string
}