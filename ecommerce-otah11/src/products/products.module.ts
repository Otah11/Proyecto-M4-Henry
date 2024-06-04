/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '../category/category.entity';
import { Product } from './products.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Product, Category])],
    controllers: [ProductController],
    providers: [ProductsService, ]
})
export class ProductModule {};