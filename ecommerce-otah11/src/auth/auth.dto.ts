import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, Matches, MaxLength, MinLength } from "class-validator";

export  class LoginUserDto {
    
    @IsNotEmpty()
    @IsEmail()
    @ApiProperty({
        description: 'Ingrese su email',
        example: 'hZkzK@example.com'
    })
    email: string;
    
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(15)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'password too weak'})
    @ApiProperty({
        description: 'Ingrese su contraseña',
        example: 'Contraseña1!'
    })
    password: string;
}