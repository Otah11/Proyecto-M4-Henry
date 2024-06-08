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
    UseGuards, 
    UseInterceptors, 
    forwardRef} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from './cloudinary.service';
import { ApiBody, ApiConsumes, ApiParam } from '@nestjs/swagger';
import { AuthGuard } from '../guards/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/guards/admin.guard';
import { Roles } from '../roles/role.decorator';
import { Role } from '../roles/role.enum';
import { ProductsRpository } from 'src/products/products.repository';

@ApiTags("Files")
@Controller('files')
export class CloudinaryController {
    constructor(private readonly cloudinaryService: CloudinaryService,
        @Inject(forwardRef(()=> ProductsRpository)) 
        private readonly productsRepository: ProductsRpository
    ) {}

    @Post('uploadImage/:id')
    @ApiBearerAuth()
    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
          type: 'object',
          properties: {
            file: {
              type: 'string',
              format: 'binary',
            }, }, },} )
    @ApiParam({
        name: 'id',
        description: 'Product ID',
        type: 'string',
    })
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
         await this.productsRepository.getProductsById(id);
         const image = await this.cloudinaryService.uploadImage(file);
         return await this.productsRepository.updateProduct(id, {imgUrl: image.url});
    }
}