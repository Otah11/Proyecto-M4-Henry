import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { OrderDto1 } from "./orders.dto1";

@Controller('orders')
export class OrdersController {
    constructor(private readonly serviceRepository: OrdersService) {}
    
    @Post()
    async addOrder(@Body()data: OrderDto1) {
        return await this.serviceRepository.addOrder(data);
    }

    @Get()
    async getAllOrders() {

        return await this.serviceRepository.getAllOrders()
    }
    @Get(":id")
  async getOrderById(@Param("id") id: string) {
   
    return await this.serviceRepository.getOrderById(id);
  }
}