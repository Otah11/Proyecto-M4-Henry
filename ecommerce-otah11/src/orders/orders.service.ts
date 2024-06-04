import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../users/users.entity";
import { Repository } from 'typeorm';
import { Order } from "./orders.entity";
import { Product } from "../products/products.entity";
import { OrderDetail } from "../orderdetail/orderDetail.entity";
import { CreateOrderDto } from "./createOrder.dto";

@Injectable()
export class OrdersService {

    constructor(
        @InjectRepository(User) private readonly usersRepository: Repository<User>,
        @InjectRepository(Product) private readonly productRepository: Repository<Product>,
        @InjectRepository(Order) private readonly orderRepository: Repository<Order>,
        @InjectRepository(OrderDetail) private readonly orderDetailRepository: Repository<OrderDetail>
    ) {}

    async addOrder(data: CreateOrderDto) {
        const updatedProduct = [];
        let totalPrice = 0;

        const user = await this.usersRepository.findOne({ where: { id: data.userId } });
        if (!user) {
            throw new NotFoundException('User not found');
        }

        for (const product of data.products) {
            const validateProduct = await this.productRepository.findOne({ where: { id: product.id } });

            if (!validateProduct) {
                throw new NotFoundException('Product not found');
            }
            if (validateProduct.stock < product.quantity) {
                throw new NotFoundException('Product out of stock');
            }
            validateProduct.stock -= product.quantity;

            totalPrice += validateProduct.price * product.quantity;
            updatedProduct.push(validateProduct);
        }

        
            await this.productRepository.save(updatedProduct);
        

        const newOrderDetail = this.orderDetailRepository.create();
        newOrderDetail.price = totalPrice;
        newOrderDetail.products = updatedProduct;

        await this.orderDetailRepository.save(newOrderDetail);

        const newOrder = this.orderRepository.create();
        newOrder.date = new Date();
        newOrder.orderDetail = newOrderDetail;
        newOrder.user = user;

        await this.orderRepository.save(newOrder);

        return newOrder;
    }

    async getAllOrders() {
        return await this.orderRepository.find({ relations: { orderDetail: true } });
    }

    async getOrderById(id: string) {
        return await this.orderRepository.findOne({ where: { id: id }, relations: { orderDetail: true } });
    }

    // async deleteOrdersByUserId(userId: string) {
    //      return await this.orderRepository.delete({ user: { id: userId } });
    // }
}

