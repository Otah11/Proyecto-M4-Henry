import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category } from "../category/category.entity";
import { Product } from "../products/products.entity";
import { CloudinaryController } from "./cloudinary.controller";
import { CloudinaryService } from "./cloudinary.service";
import { ProductsService } from "../products/products.service";
import { CloudinaryConfig } from "../config/cloudinary";

@Module({
    imports: [TypeOrmModule.forFeature([Product, Category])],
    controllers: [CloudinaryController],
    providers: [CloudinaryService, CloudinaryConfig, ProductsService],
    
})

export class CloudinaryModule {}