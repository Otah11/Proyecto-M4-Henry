/* eslint-disable prettier/prettier */
import {  Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './products.entity';
import { ProductDto } from './products.dto';

@Controller('products')
export class ProductController {
    constructor(private readonly productService: ProductsService) {}
    @Post('seeder')
    async seedProducts(){
        await this.productService.seedProducts();
        return 'Products seeded';
    }
    @Get()
    async getAllProducts(
      @Query('limit') limit: number = 5,
      @Query('page') page: number = 1,
    ) {
      return await this.productService.getAllProducts(page, limit);
    }

      @Get(':id')
      async getProductsById(@Param('id') id: string): Promise<Product> {
        return await this.productService.getProductsById(id);
      }
      @Post()
      async createProduct(@Body() product: ProductDto): Promise<Product> {
       return  await this.productService.createProduct(product);
         
      }
      @Put(':id')
      async updateProduct(@Param('id') id: string, @Body() product: ProductDto): Promise<Product> {
        return await this.productService.updateProduct(id, product);
      }
      @Delete(':id')
      async deleteProduct(@Param('id') id: string) {
        const product =await this.productService.deleteProduct(id);
        return {message: "Producto eliminado", product: product};
      }

    
    // @Get()    
    // getProducts() {
    //     return this.productService.getProducts();
    // }
    // @Get(':id')
    // getProductsById(@Param('id') id: string) {
    //     return this.productService.getProductsById(Number(id));
    // }
    // @Post()
    // @UseGuards(AuthGuard)

    // createProduct(@Body() product: Omit<Product, 'id'>): Promise<number> {
    //     return this.productService.createProduct(product);
    // }
    // @Put(':id')
    // @UseGuards(AuthGuard)
    // updateProduct(@Param('id') id: string, @Body() product: Partial<Product>): Promise<number> {
    //     return this.productService.updateProduct(Number(id), product);
    // }

    // @Delete(':id')
    // @UseGuards(AuthGuard)

    // deleteProduct(@Param('id') id: string): Promise<number> {
    //     return this.productService.deleteProduct(Number(id));
    // }

}