import { ArrayMinSize, IsArray, IsNotEmpty, IsUUID } from "class-validator"
import { OrderDto2 } from "./orders.dto2";
import { ApiProperty } from "@nestjs/swagger";

export class CreateOrderDto {

    @IsUUID()
    @IsNotEmpty()
    @ApiProperty({
        description: 'El UUID del Usuario',
        example: '123e4567-e89b-12d3-a456-426655440000'
    })
    userId: string

    @IsArray()
    @IsNotEmpty()
    @ArrayMinSize(1)
    @ApiProperty()
    products: OrderDto2[]

}