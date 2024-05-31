/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginUserDto } from "./auth.dto";
import { CreateUserDto } from "src/users/createUser.dto";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('signup')

    async signUp(@Body() createUserDto: CreateUserDto) {
        const user = await this.authService.signUp(createUserDto);
        return {
            message: 'User successfully registered',
            user,
        };
    }

    @Post('signin')
    async signIn(@Body() loginUserDto: LoginUserDto) {
        const { message, token } = await this.authService.signIn(loginUserDto);
        return {
            message,
            token,
        };
    }
}

