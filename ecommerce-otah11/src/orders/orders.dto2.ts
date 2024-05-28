import { IsNotEmpty, IsNumber, IsUUID } from "class-validator";

export class OrderDto2 {
    
    @IsNotEmpty()
    @IsUUID()
    id: string;
    
    @IsNotEmpty()
    @IsNumber()
    quantity: number;
}