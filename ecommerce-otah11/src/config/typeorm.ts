import {config as dotenvConfig} from "dotenv"
import { registerAs } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { User } from "src/users/users.entity";
import { Product } from "src/products/products.entity";
import { Category } from "src/category/category.entity";
import { Order } from "src/orders/orders.entity";
import { OrderDetail } from "src/orderdetail/orderDetail.entity";

dotenvConfig({path: '.development.env'})

const config = {
    type: 'postgres',
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    entities: [User, Product, Category, Order, OrderDetail],
    synchronize: true,
    migrations: ['dist/migrations/*{.ts,.js}'],
    logging: ['error'],
    //dropSchema: true,
    // logging: true,
    //autoLoadEntities: true,
    // entities: ['dist/**/*.entity{.ts,.js}'],
    

}
export default registerAs('typeorm', () => config)
export const connectSource = () => new DataSource(config as DataSourceOptions)