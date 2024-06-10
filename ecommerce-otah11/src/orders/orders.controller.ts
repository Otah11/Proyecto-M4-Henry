import { Body, Controller, Get, Param, ParseUUIDPipe, Post, UseGuards } from "@nestjs/common";
import { OrdersService } from './orders.service';
import { CreateOrderDto } from "./createOrder.dto";
import { AuthGuard } from "../guards/auth.guard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { RolesGuard } from '../guards/admin.guard';


@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {}
    
    @Post()
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    async addOrder(@Body()data: CreateOrderDto) {
        
      return await this.ordersService.addOrder(data);
    }

    @Get()
    @ApiBearerAuth()
    @UseGuards(AuthGuard, RolesGuard)
    async getAllOrders() {

        return await this.ordersService.getAllOrders()
    }

    @Get(":id")
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    async getOrderById(@Param("id", ParseUUIDPipe) id: string) {
   
    return await this.ordersService.getOrderById(id);
  }
  
}