/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { ProductsRepository } from "./products.repository";
import { Product } from "./products.interface";

@Injectable()
export class ProductService {
    constructor(private readonly productsRepository: ProductsRepository) {}
    getProducts(): any {
        return this.productsRepository.getProducts();
    }   
    getProductsById(id: number) {
        return this.productsRepository.getProductsById(id);
    }
    createProduct(product: Omit<Product, "id">): Promise<number> {
        return this.productsRepository.createProduct(product);
    }
    updateProduct(id: number, product: Partial<Product>): Promise<number> {
        return this.productsRepository.updateProduct(id, product);
    }
    deleteProduct(id: number): Promise<number> {
        return this.productsRepository.deleteProduct(id);
    }
}