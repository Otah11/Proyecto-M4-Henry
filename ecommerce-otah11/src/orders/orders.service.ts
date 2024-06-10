import { Injectable } from "@nestjs/common";
import { CreateOrderDto } from "./createOrder.dto";
import { OrdersRepository } from "./orders.repository";

@Injectable()
export class OrdersService {
constructor(private readonly ordersRepository: OrdersRepository) {}

    async addOrder(data: CreateOrderDto){
        return await this.ordersRepository.addOrder(data);
    }

    async getAllOrders(){
        return await this.ordersRepository.getAllOrders();
    }

    async getOrderById(id: string){
        return await this.ordersRepository.getOrderById(id)
    }

}
