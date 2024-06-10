import { Module } from "@nestjs/common";
import { AutomaticSeederService } from "./automaticSeeder.service";
import { CategoryService } from "../category/category.service";
import { ProductsService } from "../products/products.service";
import { CategoryRepository } from "../category/category.repository";
import { ProductsRpository } from "../products/products.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category } from "../category/category.entity";
import { Product } from "../products/products.entity";

@Module({
    imports:[TypeOrmModule.forFeature([Category, Product])],
    controllers:[],
    providers:[AutomaticSeederService, CategoryService, CategoryRepository, ProductsService, ProductsRpository]
})
export class AutomaticSeederModule{}