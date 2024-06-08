import { Injectable, } from "@nestjs/common";
import { UploadApiResponse } from "cloudinary";
import { CloudinaryRepository } from "./cloudinary.repository";

@Injectable()
export class CloudinaryService {
    constructor (private readonly cloudinaryRepository: CloudinaryRepository){}

    async uploadImage(file: Express.Multer.File): Promise<UploadApiResponse> {
        return await this.cloudinaryRepository.uploadImage(file)
    }
}