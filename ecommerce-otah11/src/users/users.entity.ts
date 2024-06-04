import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Order } from '../orders/orders.entity';
import { v4 as uuid } from 'uuid';
import { Role } from '../roles/role.enum';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';

@Entity({name: 'users'})
export class User {
    @PrimaryGeneratedColumn('uuid')
    @ApiHideProperty()
    id: string=uuid();

    @Column({ length: 50 })
    @ApiProperty({
        description: 'El nombre del Usuario',
        example: 'Fulano de Tal'
    })
    name: string;

    @Column({ length: 50, unique: true })
    @ApiProperty({
        description: 'El email del Usuario',
        example: 'hJQpU@example.com'
    })
    email: string;

    @Column({ length: 200, select: false })
    @ApiProperty({
        description: 'La contraseña del Usuario',
        example: 'Contraseña1!'
    })
    password: string;

    @Column('int', { nullable: true })
    @ApiProperty({
        description: 'El telefono del Usuario',
        example: 123456789
    })
    phone: number;

    @Column({ length: 50, nullable: true })
    @ApiProperty({
        description: 'El pais del Usuario',
        example: 'Argentina'
    })
    country: string;

    @Column('text', { nullable: true })
    @ApiProperty({
        description: 'La direccion del Usuario',
        example: 'Calle Siempre Viva 123'
    })
    address: string;

    @Column({ length: 50, nullable: true })
    @ApiProperty({
        description: 'La ciudad del Usuario',
        example: 'Buenos Aires'
    })
    city: string;

    @Column ({default: Role.USER})
    @ApiProperty({
        description: 'El rol del Usuario',
        example: 'USER o ADMIN'
    })
    roles: Role;

    @OneToMany(() => Order, order => order.user)
    orders: Order[];
}