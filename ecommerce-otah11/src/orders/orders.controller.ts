import { Body, Controller, Get, Param, ParseUUIDPipe, Post, UseGuards } from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { CreateOrderDto } from "./createOrder.dto";
import { AuthGuard } from "src/guards/auth.guard";

@Controller('orders')
export class OrdersController {
    constructor(private readonly serviceRepository: OrdersService) {}
    
    @Post()
    @UseGuards(AuthGuard)
    async addOrder(@Body()data: CreateOrderDto) {
        return await this.serviceRepository.addOrder(data);
    }

    @Get()
    async getAllOrders() {

        return await this.serviceRepository.getAllOrders()
    }
    @Get(":id")
    @UseGuards(AuthGuard)
  async getOrderById(@Param("id", ParseUUIDPipe) id: string) {
   
    return await this.serviceRepository.getOrderById(id);
  }
}