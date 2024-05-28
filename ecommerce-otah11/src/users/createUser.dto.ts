import {
    IsEmail,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    Matches,
    MaxLength,
    MinLength,
  } from 'class-validator';
  
  
  export class CreateUserDto {
      @IsNotEmpty()
      @MinLength(3)
      @MaxLength(80)
      @IsString()
      name: string
  
      @IsEmail()
      @IsNotEmpty()
      email: string
  
  
      @IsNotEmpty()
      @MinLength(8)
      @MaxLength(15)
      @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&_\-]).{8,15}$/, { message: 'password too weak' })
      @IsString()
      password: string
  
      @IsNotEmpty()
      @MinLength(3)
      @MaxLength(80)
      @IsString()
      address: string
  
      @IsNotEmpty()
      @IsNumber()
      phone: number
  
      @MinLength(5)
      @MaxLength(20)
      @IsOptional()
      @IsString()
      country: string
  
      @MinLength(5)
      @MaxLength(20)
      @IsOptional()
      @IsString()
      city: string
  }