import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToOne, JoinTable, JoinColumn } from 'typeorm';
import { Order } from '../orders/orders.entity';
import { Product } from '../products/products.entity';
import { v4 as uuid } from 'uuid';

@Entity({name: 'order_details'})
export class OrderDetail {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid();

    @Column('decimal', { precision: 10, scale: 2 })
    price: number;

    @OneToOne(() => Order, order => order.orderDetail)
    @JoinColumn()
    order: Order;

    @ManyToMany(() => Product, product => product.orderDetails)
    @JoinTable()
    products: Product[];
}