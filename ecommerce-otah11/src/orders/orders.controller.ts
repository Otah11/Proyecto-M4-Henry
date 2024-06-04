import { Body, Controller, Get, Param, ParseUUIDPipe, Post, UseGuards } from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { CreateOrderDto } from "./createOrder.dto";
import { AuthGuard } from "../guards/auth.guard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { RolesGuard } from "src/guards/admin.guard";


@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
    constructor(private readonly serviceRepository: OrdersService) {}
    
    @Post()
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    async addOrder(@Body()data: CreateOrderDto) {
        
      return await this.serviceRepository.addOrder(data);
    }

    @Get()
    @ApiBearerAuth()
    @UseGuards(AuthGuard, RolesGuard)
    async getAllOrders() {

        return await this.serviceRepository.getAllOrders()
    }

    @Get(":id")
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
  async getOrderById(@Param("id", ParseUUIDPipe) id: string) {
   
    return await this.serviceRepository.getOrderById(id);
  }
}