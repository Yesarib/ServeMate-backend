import { ArrayMinSize, ArrayNotEmpty, IsArray, IsBoolean, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString } from 'class-validator';

export class CreateOrderDto {
    @IsNotEmpty()
    @IsString()
    tableId: string

    @IsNotEmpty()
    @IsString()
    companyId: string

    @IsArray()
    @ArrayNotEmpty()
    @ArrayMinSize(1)
    @IsNotEmpty({ each: true })
    @IsObject({ each: true })
    products: { productId: string; quantity: number }[];

    @IsOptional()
    @IsString()
    status: string

    @IsOptional()
    @IsBoolean()
    isNewOrder: boolean
}

export class NewItem {
    @IsNotEmpty()
    @IsString()
    productId: string;

    @IsNotEmpty()
    @IsNumber()
    quantity: number;
}