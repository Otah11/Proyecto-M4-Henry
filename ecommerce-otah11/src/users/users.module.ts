/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entity';
import { OrdersService } from '../orders/orders.service';
import { Product } from '../products/products.entity';
import { Order } from '../orders/orders.entity';
import { OrderDetail } from '../orderdetail/orderDetail.entity';

@Module({
    imports:[TypeOrmModule.forFeature([User, Product, Order, OrderDetail])],
    controllers: [UsersController],
    providers: [UsersService, OrdersService],
   
})

export class UserModule {
}

