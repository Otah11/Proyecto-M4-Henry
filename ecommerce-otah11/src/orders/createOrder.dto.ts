import { IsArray, IsNotEmpty, IsUUID, MinLength } from "class-validator"
import { OrderDto2 } from "./orders.dto2";

export class CreateOrderDto {

    @IsUUID()
    @IsNotEmpty()
    userId: string

    @IsArray()
    @IsNotEmpty()
    @MinLength(1)
    products: OrderDto2[]

}