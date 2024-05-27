/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entity';
import { OrdersService } from 'src/orders/orders.service';
import { Product } from 'src/products/products.entity';
import { Order } from 'src/orders/orders.entity';
import { OrderDetail } from 'src/orderdetail/orderDetail.entity';

@Module({
    imports:[TypeOrmModule.forFeature([User, Product, Order, OrderDetail])],
    controllers: [UsersController],
    providers: [UsersService, OrdersService],
   
})

export class UserModule {
}

