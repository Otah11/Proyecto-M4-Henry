import { ArrayMinSize, IsArray, IsNotEmpty, IsUUID } from "class-validator"
import { OrderDto2 } from "./orders.dto2";

export class CreateOrderDto {

    @IsUUID()
    @IsNotEmpty()
    userId: string

    @IsArray()
    @IsNotEmpty()
    @ArrayMinSize(1)
    products: OrderDto2[]

}