import { Body, Controller, Get, Param, ParseUUIDPipe, Post } from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { CreateOrderDto } from "./createOrder.dto";

@Controller('orders')
export class OrdersController {
    constructor(private readonly serviceRepository: OrdersService) {}
    
    @Post()
    async addOrder(@Body()data: CreateOrderDto) {
        return await this.serviceRepository.addOrder(data);
    }

    @Get()
    async getAllOrders() {

        return await this.serviceRepository.getAllOrders()
    }
    @Get(":id")
  async getOrderById(@Param("id", ParseUUIDPipe) id: string) {
   
    return await this.serviceRepository.getOrderById(id);
  }
}