/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ProductService } from './products.service';
import { Product } from './products.interface';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('products')
export class ProductController {
    constructor(private readonly productService: ProductService) {}
    @Get()    
    getProducts() {
        return this.productService.getProducts();
    }
    @Get(':id')
    getProductsById(@Param('id') id: string) {
        return this.productService.getProductsById(Number(id));
    }
    @Post()
    @UseGuards(AuthGuard)

    createProduct(@Body() product: Omit<Product, 'id'>): Promise<number> {
        return this.productService.createProduct(product);
    }
    @Put(':id')
    @UseGuards(AuthGuard)
    updateProduct(@Param('id') id: string, @Body() product: Partial<Product>): Promise<number> {
        return this.productService.updateProduct(Number(id), product);
    }

    @Delete(':id')
    @UseGuards(AuthGuard)

    deleteProduct(@Param('id') id: string): Promise<number> {
        return this.productService.deleteProduct(Number(id));
    }

}