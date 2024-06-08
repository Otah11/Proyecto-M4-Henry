import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Order } from "./orders.entity";
import { OrdersController } from "./orders.controller";
import { OrdersService } from "./orders.service";
import { Product } from "../products/products.entity";
import { User } from "../users/users.entity";
import { OrderDetail } from "../orderdetail/orderDetail.entity";
import { OrdersRepository } from "./orders.repository";

@Module({
    imports: [TypeOrmModule.forFeature([Order, Product, User, OrderDetail])],
    controllers: [OrdersController],
    providers: [OrdersService, OrdersRepository]
})

export class OrdersModule { }