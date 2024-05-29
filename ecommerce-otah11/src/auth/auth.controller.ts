/* eslint-disable prettier/prettier */
import { Body, Controller,  Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginUserDto } from "./auth.dto";
import { CreateUserDto } from "src/users/createUser.dto";


@Controller('auth')
export class AuthController {


    constructor(private readonly authService: AuthService) {}
    @Post ('signup')
    signUp(@Body() user: CreateUserDto) {
        return this.authService.signUp(user);
    }

    @Post("signin")
    async signIn(@Body() credentials: LoginUserDto) {
        return await this.authService.signIn(credentials);
}
}
