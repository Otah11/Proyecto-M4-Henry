import { Controller, Get, Post } from "@nestjs/common";
import { CategoryService } from "./category.service";

@Controller('categories')


export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}
    @Get()
    async getAllCategories() {
        return await this.categoryService.getAllCategories();
    }

    @Post('seeder')
    async seederCategory() {
        await this.categoryService.seederCategory()
        return 'todo ok'
    }
}

