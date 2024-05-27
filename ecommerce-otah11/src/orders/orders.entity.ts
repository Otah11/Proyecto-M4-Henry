import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { User } from '../users/users.entity';
import { OrderDetail } from '../orderdetail/orderDetail.entity';
import { v4 as uuid } from 'uuid';

@Entity({name: 'orders'})
export class Order {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid();

    @ManyToOne(() => User, user => user.orders)
    user: User;

    @Column('date')
    date: Date;

    @OneToOne(() => OrderDetail, orderDetail => orderDetail.order)
    @JoinColumn()
    orderDetail: OrderDetail;
}