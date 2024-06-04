/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './products.entity';
import { Repository } from 'typeorm';
import { Category } from '../category/category.entity';
import { products } from '../utils/products';
import { ProductDto } from './products.dto';

@Injectable()
export class ProductsService {
    
    
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>,
    ) {}
    async seedProducts() {
        const productsArray = await this.productRepository.find();
        if (productsArray.length == 0) {
            for (const product of products) {
                const category = await this.categoryRepository.findOne({
                    where: { name: product.category },
                });
                if (category) {
                    product.category = category.id;
                    await this.productRepository.save(product);
            }
        }
    }
}
async getAllProducts(page: number, limit: number) {
    const [products] = await this.productRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      relations: { category: true },
    });
    return products;
}
async getProductsById(id: string ): Promise<Product> {
    const product = await this.productRepository.findOne({
        where: { id: id },
        relations: { category: true },
    })
    return product
}
async createProduct(product: ProductDto): Promise<Product> {
    const foundProduct = await this.productRepository.findOneBy({ name: product.name, description: product.description });

    if (foundProduct){
        throw new NotFoundException('Product already exists');
    }
    if (!product.category) {
        throw new NotFoundException('Category not found');
    }

    const category = await this.categoryRepository.findOneBy({ name: product.category });

    if (!category) {
        throw new NotFoundException('Category not found');
    }

    const newProduct = this.productRepository.create({
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
        imgUrl: product.imgUrl,
        category: category.id
    });
    await this.productRepository.save(newProduct);
    return newProduct    
    }

async updateProduct(id: string, product:any): Promise<Product> {
    const productToUpdate = await this.productRepository.findOne({ where: {id: id}, relations: { category: true }});
    if(!productToUpdate) {
        throw new NotFoundException('Product not found');
    }
    if(productToUpdate.category){
        const category = await this.categoryRepository.findOne({where: {name: product.category}})
        product.category = category.id;
    }
    Object.assign(productToUpdate, product);
    await this.productRepository.save(productToUpdate);
    return productToUpdate;
    }
    async deleteProduct(id: string): Promise<Product> {
        const findProduct = await this.productRepository.findOne({where: {id: id}});
        if(!findProduct) {
            throw new NotFoundException('Product not found');
        }
    return await this.productRepository.remove(findProduct);
    }
}