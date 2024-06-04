import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "./category.entity";
import { Repository } from "typeorm";
import { categories } from "src/utils/category";

@Injectable()
export class CategoryService {
    

    constructor(@InjectRepository(Category) private readonly categoryRepository: Repository<Category>) {}
    async seederCategory():Promise<void>{
        const arrayOfCategories = await this.categoryRepository.find();
        if(arrayOfCategories.length === 0){
            for (const i of categories ){
                await this.categoryRepository.save(i);}
        }
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