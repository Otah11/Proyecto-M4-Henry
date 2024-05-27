/*  eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { AuthDto } from "./auth.dto";
import { User } from "src/users/users.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class AuthService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User> ) {}
    getAuth(): string {
        return "Auth"
    }

    async signIn(credentials: AuthDto): Promise<User | string> {
        if (!credentials.email || !credentials.password) {
            return "Faltan credenciales..."
        }
        const user = await this.userRepository.findOne({where: {email: credentials.email, password: credentials.password}});

        if (!user) {
            return "Email o contraseña incorrectas."
        }

        return user;
    }
}