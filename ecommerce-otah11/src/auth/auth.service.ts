/*  eslint-disable prettier/prettier */
import {  Injectable } from "@nestjs/common";
import { LoginUserDto } from "./auth.dto";
import { User } from "../users/users.entity";
import { CreateUserDto } from "../users/createUser.dto";
import { AuthRepository } from "./auth.repository";

@Injectable()
export class AuthService {
    constructor(private readonly authRepository: AuthRepository) {}

    async signUp(user: CreateUserDto): Promise<Partial<User>> {
        return await this.authRepository.signUp(user)
    }

    async signIn(credentials: LoginUserDto) {
        return await this.authRepository.signIn(credentials)
    }
}
