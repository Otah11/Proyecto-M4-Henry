import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category } from "src/category/category.entity";
import { Product } from "src/products/products.entity";
import { CloudinaryController } from "./cloudinary.controller";
import { CloudinaryService } from "./cloudinary.service";
import { ProductsService } from "src/products/products.service";
import { CloudinaryConfig } from "src/config/cloudinary";

@Module({
    imports: [TypeOrmModule.forFeature([Product, Category])],
    controllers: [CloudinaryController],
    providers: [CloudinaryService, CloudinaryConfig, ProductsService],
    
})

export class CloudinaryModule {}