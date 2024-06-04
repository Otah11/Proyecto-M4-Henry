import { ApiProperty } from "@nestjs/swagger";
import { 
    IsNotEmpty, 
    IsNumber, 
    IsString, 
    MaxLength, 
    MinLength 
} from "class-validator";

/* eslint-disable prettier/prettier */
export class ProductDto {
    
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(20)
    @ApiProperty({
        description: 'Nombre del Producto',
        example: 'Notebook',
    })
    name: string;
    
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(20)
    @ApiProperty({
        description: 'Descripcion del Producto',
        example: 'Computadora portatil',
    })
    description: string;
    
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({
        description: 'Precio del Producto',
        example: '$4000,00',
    })
    price: number;
    
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({
        description: 'Stock del Producto',
        example: '55',
    })
    stock: number;
    
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(20)
    @ApiProperty({
        description: 'Imagen del Producto',
        example: 'www.google.com/imagen.jpg',
    })
    imgUrl: string;
    
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(20)
    @ApiProperty({
        description: 'Categoria del Producto',
        example: 'Computadoras',
    })
    category: string;
}