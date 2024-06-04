import { ApiProperty } from '@nestjs/swagger';
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
      @ApiProperty({
        description: 'Coloque su nombre',
        example: 'Juan Perez'
      })
      name: string
  
      @IsEmail()
      @IsNotEmpty()
      @ApiProperty({
        description: 'Coloque su correo',
        example: '2b5pK@example.com'
      })
      email: string
  
  
      @IsNotEmpty()
      @MinLength(8)
      @MaxLength(15)
      @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&_\-]).{8,15}$/, { message: 'password too weak' })
      @IsString()
      @ApiProperty({
        description: 'Coloque su contraseña, debe contener al menos una mayuscula, una minuscula, un numero y un caracter especial',
        example: 'Password1!'
      })
      password: string

      @IsNotEmpty()
      @MinLength(8)
      @MaxLength(15)
      @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&_\-]).{8,15}$/, { message: 'password too weak' })
      @IsString()
      @ApiProperty({
        description: 'Repita su contraseña',
        example: 'Password1!'
      })
      confirmPassword: string
  
      @IsNotEmpty()
      @MinLength(3)
      @MaxLength(80)
      @IsString()
      @ApiProperty({
        description: 'Coloque su direccion',
        example: 'Calle Siempre Viva 123'
      })
      address: string
  
      @IsNotEmpty()
      @IsNumber()
      @ApiProperty({
        description: 'Coloque su telefono',
        example: '123456789'
      })
      phone: number
  
      @MinLength(5)
      @MaxLength(20)
      @IsOptional()
      @IsString()
      @ApiProperty({
        description: 'Coloque su pais',
        example: 'Tazmania'
      })
      country: string
  
      @MinLength(5)
      @MaxLength(20)
      @IsOptional()
      @IsString()
      @ApiProperty({
        description: 'Coloque su ciudad',
        example: 'Alguna ciudad'
      })
      city: string
  }