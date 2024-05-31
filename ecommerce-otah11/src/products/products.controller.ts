/* eslint-disable prettier/prettier */
import {  Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './products.entity';
import { ProductDto } from './products.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { Roles } from 'src/roles/role.decorator';
import { Role } from 'src/roles/role.enum';
import { RolesGuard } from 'src/guards/admin.guard';

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
      async getProductsById(@Param('id',ParseUUIDPipe) id: string): Promise<Product> {
        return await this.productService.getProductsById(id);
      }
      @Post()
      async createProduct(@Body() product: ProductDto): Promise<Product> {
       return  await this.productService.createProduct(product);
         
      }
      @Put(':id')
      @Roles(Role.ADMIN)
      @UseGuards(AuthGuard, RolesGuard)
      async updateProduct(@Param('id',ParseUUIDPipe) id: string, @Body() product: ProductDto): Promise<Product> {
        return await this.productService.updateProduct(id, product);
      }
      @Delete(':id')
      async deleteProduct(@Param('id',ParseUUIDPipe) id: string) {
        const product =await this.productService.deleteProduct(id);
        return {message: "Producto eliminado", product: product};
      }


}