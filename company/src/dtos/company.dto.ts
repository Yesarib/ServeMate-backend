import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateCompanyDto {
    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsString()
    address: string

    @IsNotEmpty()
    @IsString()
    contactNumber: string

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string
}

export class UpdateCompanyDto {
    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsString()
    address: string

    @IsNotEmpty()
    @IsString()
    contactNumber: string

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string
}