import { 
    Controller, 
    FileTypeValidator, 
    Inject, 
    MaxFileSizeValidator, 
    Param, 
    ParseFilePipe, 
    ParseUUIDPipe, 
    Post, 
    // Put,  
    UploadedFile, 
    UseInterceptors, 
    forwardRef} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from './cloudinary.service';
import { ProductsService } from 'src/products/products.service';


@Controller('files')
export class CloudinaryController {
    constructor(private readonly cloudinaryService: CloudinaryService,
        @Inject(forwardRef(()=> ProductsService)) 
        private readonly productService: ProductsService
    ) {}

    @Post('uploadImage/:id')
    @UseInterceptors(FileInterceptor('file'))
    async uploadImage(
        @Param('id', ParseUUIDPipe) id: string,
        @UploadedFile(new ParseFilePipe({
        validators: [
            new MaxFileSizeValidator({ maxSize: 1024000, 
                message: 'El tamaño maximo es de 1mb'
             }),
            new FileTypeValidator({ 
                fileType: /.(jpg|jpeg|webp|svg|png|gif)$/

             })
        ],
        
    }))file: Express.Multer.File
    ) {
         await this.productService.getProductsById(id);
         const image = await this.cloudinaryService.uploadImage(file);
         return await this.productService.updateProduct(id, {imgUrl: image.url});
    }
}