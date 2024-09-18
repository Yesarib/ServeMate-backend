import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { ObjectId } from 'mongoose';

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    fullName: string;

    @IsEmail({}, { message: 'Invalid email address' })
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @IsString()
    @Length(6)
    password: string

    @IsNotEmpty()
    @IsString()
    role:string

    @IsNotEmpty()
    @IsString()
    phoneNumber: string

    @IsNotEmpty()
    companyId: ObjectId
}

export class UpdateUserDto {
    @IsNotEmpty()
    @IsString()
    fullName: string;

    @IsNotEmpty()
    @IsString()
    role:string

    @IsNotEmpty()
    @IsString()
    phoneNumber: string
}