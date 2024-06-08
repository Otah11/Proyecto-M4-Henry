import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category } from "../category/category.entity";
import { Product } from "../products/products.entity";
import { CloudinaryController } from "./cloudinary.controller";
import { CloudinaryService } from "./cloudinary.service";
import { CloudinaryConfig } from "../config/cloudinary";
import { ProductsRpository } from "../products/products.repository";
import { CloudinaryRepository } from "./cloudinary.repository";

@Module({
    imports: [TypeOrmModule.forFeature([Product, Category])],
    controllers: [CloudinaryController],
    providers: [CloudinaryService, CloudinaryConfig, ProductsRpository, CloudinaryRepository],
    
})

export class CloudinaryModule {}