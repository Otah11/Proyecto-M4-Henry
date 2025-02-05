import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Product } from '../products/products.entity';
import { v4 as uuid } from 'uuid';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';

@Entity({name: 'order_details'})
export class OrderDetail {
    @PrimaryGeneratedColumn('uuid')
    @ApiHideProperty()
    id: string = uuid();

    @Column('decimal', { precision: 10, scale: 2 })
    @ApiProperty({
        description: 'El precio del producto',
        example	: 500.00
    })
    price: number;



    @ManyToMany(() => Product, product => product.orderDetails, {onDelete :'SET NULL'})
    @JoinTable({
        name: 'order_details_products',
        joinColumn: {
            name: 'product_id',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'order_id',
            referencedColumnName: 'id'
        }
    })
    products: Product[];
}