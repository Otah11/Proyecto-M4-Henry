import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "./category.entity";
import { Repository } from "typeorm";
import { categories } from "src/utils/category";

@Injectable()
export class CategoryRepository {
    constructor(@InjectRepository(Category) private readonly categoryRepository: Repository<Category>) {}
    
    async seedCategory():Promise<Category[]>{
        const categoriesArray = await this.categoryRepository.find();
        if(categoriesArray.length === 0){
            for (const i of categories ){
                await this.categoryRepository.save(i);}
        }
        return await this.categoryRepository.find()
    }
    async getAllCategories() {
        return await this.categoryRepository.find();
    }

    async addCategory(categories: Category[]) {
        const newCategories = []
        for (const category of categories) {
            const existingCategories = await this.categoryRepository.findOne({ where: { name: category.name } })
            if(!existingCategories) {
                newCategories.push(await this.categoryRepository.save(category))   
            }

        }
        return newCategories
    }
}