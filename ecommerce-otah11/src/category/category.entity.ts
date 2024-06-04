import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Product } from '../products/products.entity';
import { v4 as uuid } from 'uuid';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'categories' })
export class Category {
    @PrimaryGeneratedColumn('uuid')
    @ApiHideProperty()
    id: string=uuid();

    @Column({ length: 50 })
    @ApiProperty({
        description: 'Nombre de la categoría',
        example: 'Celulares',
    })
    name: string;

    @OneToMany(() => Product, product => product.category)
    products: Product[];

    // @OneToOne(() => Product, product => product.category)
    // product: Product;
}
