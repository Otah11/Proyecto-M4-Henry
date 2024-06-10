/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { ProductsRpository } from './products.repository';
import { Product } from './products.entity';
import { ProductDto } from './products.dto';

@Injectable()
export class ProductsService {
    constructor (private readonly productsRepository: ProductsRpository) {}

    async seedProducts(){
        return await this.productsRepository.seedProducts()
    }

    async getAllProducts(page: number, limit: number):Promise<Product[]>{
        return await this.productsRepository.getAllProducts(page, limit)
    }

    async getProductById(id: string):Promise<Product>{
        return await this.productsRepository.getProductById(id)
    }


    async createProduct(product: ProductDto): Promise<Product> {
        return await this.productsRepository.createProduct(product)

    }

    async updateProduct(id: string, product: Partial<ProductDto>): Promise<Product> {
        return await this.productsRepository.updateProduct(id, product)
    }

    async deleteProduct(id: string){
        const products = await this.productsRepository.deleteProduct(id)
        return {message: "Producto Eliminado", products: products}
    }
}