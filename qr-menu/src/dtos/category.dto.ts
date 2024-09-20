import { ArrayMinSize, ArrayNotEmpty, IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCategoryDto {
    @IsNotEmpty()
    @IsString()
    name: string

    @IsArray()
    @ArrayNotEmpty()
    @ArrayMinSize(1)
    @IsString({ each: true })
    products: string[];

    @IsString()
    @IsOptional()
    imagePath: string

    @IsString()
    @IsNotEmpty()
    companyId: string
}

export class UpdateCategoryDto {
    @IsNotEmpty()
    @IsString()
    name: string

    @IsArray()
    @ArrayNotEmpty()
    @ArrayMinSize(1)
    @IsString({ each: true })
    products: string[];

    @IsString()
    @IsOptional()
    imagePath: string
}