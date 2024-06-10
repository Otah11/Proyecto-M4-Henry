/* eslint-disable prettier/prettier */
import {  Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './products.entity';
import { ProductDto } from './products.dto';
import { AuthGuard } from '../guards/auth.guard';
import { Roles } from '../roles/role.decorator';
import { Role } from '../roles/role.enum';
import { RolesGuard } from '../guards/admin.guard';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags("Products")
@Controller('products')
export class ProductController {
    constructor(private readonly productService: ProductsService) {}

      // @Post('seeder')
      // async seedProducts():Promise<Product[]>{
      // return await this.productService.seedProducts();       
      // }

      @Get()
      async getAllProducts(@Query('limit') limit: number = 5, @Query('page') page: number = 1,) {
      return await this.productService.getAllProducts(page, limit);
      }

      @Get(':id')
      async getProductById(@Param('id',ParseUUIDPipe) id: string): Promise<Product> {
        return await this.productService.getProductById(id);
      }

      @Post()
      @ApiBearerAuth()
      @Roles(Role.ADMIN)
      @UseGuards(AuthGuard, RolesGuard)
      async createProduct(@Body() product: ProductDto): Promise<Product> {
        return  await this.productService.createProduct(product);      
      }

      @Put(':id')
      @ApiBearerAuth()
      @ApiBody({type: Object,})
      @Roles(Role.ADMIN)
      @UseGuards(AuthGuard, RolesGuard)
      async updateProduct(@Param('id',ParseUUIDPipe) id: string, @Body() product: Partial<ProductDto>): Promise<Product> {
        return await this.productService.updateProduct(id, product);
      }

      @Delete(':id')
      @ApiBearerAuth()
      @Roles(Role.ADMIN)
      @UseGuards(AuthGuard, RolesGuard)
      async deleteProduct(@Param('id',ParseUUIDPipe) id: string) {
        return await this.productService.deleteProduct(id);        
      }
}

