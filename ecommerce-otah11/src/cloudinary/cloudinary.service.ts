import { Injectable, } from "@nestjs/common";
import { UploadApiResponse, v2 } from "cloudinary";
import * as toStream from 'buffer-to-stream';

@Injectable()
export class CloudinaryService {
    

    async uploadImage(file: Express.Multer.File): Promise<UploadApiResponse> {
        return new Promise((resolve, reject)=>{
            const uploader = v2.uploader.upload_stream(
                {
                    resource_type: "auto",
                },
                (error, result) => {
                    if(error) {reject(error)} else {resolve(result)} //sintaxis, en el if las llaves cuentan como un return
                },
            );
            toStream(file.buffer).pipe(uploader); 
        }) 
    }
}