import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

/* eslint-disable prettier/prettier */
export class CategoryDto {
    
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    name: string;
}