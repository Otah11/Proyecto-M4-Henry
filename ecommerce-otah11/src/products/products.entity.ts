import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { Category } from '../category/category.entity';
import { OrderDetail } from '../orderdetail/orderDetail.entity';
import { v4 as uuid } from 'uuid';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'products' })
export class Product {
    @PrimaryGeneratedColumn('uuid')
    @ApiHideProperty()
    id: string= uuid();

    @Column({ length: 50 })
    @ApiProperty({
        description: 'Nombre del producto',
        example: 'smartphone'
    })
    name: string;

    @Column('text')
    @ApiProperty({
        description: 'Descripcion del producto',
        example: 'smartphone octa core, etc'
    })
    description: string;

    @Column('decimal', { precision: 10, scale: 2 })
    @ApiProperty({
        description: 'Valor del producto',
        example: '4000.00'
    })
    price: number;

    @Column('int')
    @ApiProperty({
        description: 'Cantidad del producto',
        example: '500'
    })
    stock: number;

    @Column({ default: 'default-image.jpg', nullable: true })
    @ApiProperty({
        description: 'imagen del producto',
        example: 'www.google.com/imagen.jpg'
    })
    imgUrl: string;

    @ManyToOne(() => Category, category => category.products)
    category: Category|Category["id"];

    @ManyToMany(() => OrderDetail, orderDetail => orderDetail.products)
    @JoinTable()
    orderDetails: OrderDetail[];
}