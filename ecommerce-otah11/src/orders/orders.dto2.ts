import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsUUID } from "class-validator";

export class OrderDto2 {
    
    @IsNotEmpty()
    @IsUUID()
    @ApiProperty()
    id: string;
    
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({
        description: 'Cantidad del producto',
        example:  '1'
    })
    quantity: number;
}