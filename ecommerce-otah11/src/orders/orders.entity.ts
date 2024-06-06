import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { User } from '../users/users.entity';
import { OrderDetail } from '../orderdetail/orderDetail.entity';
import { v4 as uuid } from 'uuid';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';

@Entity({name: 'orders'})
export class Order {
    @PrimaryGeneratedColumn('uuid')
    @ApiHideProperty()
    id: string = uuid();

    @ManyToOne(() => User, user => user.orders, {onDelete: "SET NULL"})
    @JoinColumn({name: 'user_id'})
    user: User;

    @Column('date')
    @ApiProperty({
        description: 'Fecha de la Orden',
        example:'2022-01-01'
    })
    date: Date;

    @OneToOne(() => OrderDetail)
    @JoinColumn()
    orderDetail: OrderDetail;
}