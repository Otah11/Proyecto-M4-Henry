/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LogginUserDto } from "./auth.dto";
import { User } from "src/users/users.entity";


@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    @Get()
    getAuth(){
        return this.authService.getAuth();
    }

    @Post("signin")
    async signIn(@Body() credentials: LogginUserDto): Promise<User | string> {
        return await this.authService.signIn(credentials);
}
}
