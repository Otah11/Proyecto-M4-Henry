import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Category } from "./category.entity";
import { AuthGuard } from "../guards/auth.guard";
import { RolesGuard } from "../guards/admin.guard";
import { Role } from "../roles/role.enum";
import { Roles } from "../roles/role.decorator";


@ApiTags('Categories')
@Controller('categories')


export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}
    @Get()
    async getAllCategories() {
        return await this.categoryService.getAllCategories();
    }

    @Post('add')
    @ApiBearerAuth()
    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    async addCategory(@Body()categories: Category[]) {
        return await this.categoryService.addCategory(categories);
        

    }

    @Post('seeder')
    async seederCategory():Promise<Category[]> {
         
        return await this.categoryService.seederCategory()
    }
}

