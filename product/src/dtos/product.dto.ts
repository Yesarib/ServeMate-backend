import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
    @IsNotEmpty()
    @IsString()
    name: string
    
    @IsNotEmpty()
    @IsString()
    description: string

    @IsString()
    @IsOptional()
    imagePath?: string

    @IsNumber()
    @IsNotEmpty()
    price: number

    @IsNotEmpty()
    @IsString()
    companyId: string
}

export class UpdateProductDto {
    @IsNotEmpty()
    @IsString()
    name: string
    
    @IsNotEmpty()
    @IsString()
    description: string

    @IsString()
    imagePath: string

    @IsNumber()
    @IsNotEmpty()
    price: number
}

