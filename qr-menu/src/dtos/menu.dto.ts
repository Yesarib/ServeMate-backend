import { ArrayMinSize, ArrayNotEmpty, IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateMenuDto {
    @IsNotEmpty()
    @IsString()
    tableId: string

    @IsNotEmpty()
    @IsString()
    companyId: string

    @IsArray()
    @ArrayNotEmpty()
    @ArrayMinSize(1)
    @IsString({ each: true })
    items: string[];
}

export class UpdateMenuDto {
    @IsNotEmpty()
    @IsString()
    tableId: string

    @IsNotEmpty()
    @IsString()
    companyId: string

    @IsArray()
    @IsNotEmpty()
    items: []


}