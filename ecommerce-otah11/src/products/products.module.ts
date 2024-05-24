/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ProductService } from './products.service';
import { ProductController } from './products.controller';
import { ProductsRepository } from './products.repository';

@Module({
    imports: [],
    controllers: [ProductController],
    providers: [ProductService, ProductsRepository]
})
export class ProductModule {

};