import { Injectable, OnModuleInit } from "@nestjs/common";
import { CategoryService } from '../category/category.service';
import { ProductsService } from '../products/products.service';

@Injectable()
export class AutomaticSeederService implements OnModuleInit {
    constructor(
        private readonly categoryService: CategoryService,
        private readonly productsService: ProductsService
    ){}
    
    async onModuleInit() {
        await this.categoryService.seederCategory();
        await this.productsService.seedProducts();
    }
}