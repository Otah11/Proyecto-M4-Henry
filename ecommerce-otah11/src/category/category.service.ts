import { Injectable } from "@nestjs/common";
import { Category } from "./category.entity";
import { CategoryRepository } from "./category.repository";

@Injectable()
export class CategoryService {
    constructor(private readonly categoryRepository: CategoryRepository) {}
    
    async seedCategory():Promise<Category[]>{
        return await this.categoryRepository.seedCategory()
    }
    async getAllCategories() {
        return await this.categoryRepository.getAllCategories()
    }

    async addCategory(categories: Category[]) {
        return await this.categoryRepository.addCategory(categories)
    }
}