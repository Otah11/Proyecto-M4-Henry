/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './auth.dto';
import { User } from 'src/users/users.interface';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}
    @Get()
    getAuth(){
        return this.authService.getAuth();
    }
    @Post('signin')
     sigIn(@Body() credential: AuthDto): Promise<User | string> {
        return this.authService.signIn(credential);
    }
    }

