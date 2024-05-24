/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { UsersRepository } from '../users/users.repository';
import { AuthDto } from "./auth.dto";
import { User } from "src/users/users.interface";

@Injectable()
export class AuthService {
    constructor(private readonly usersRepository: UsersRepository) {}
 getAuth(): string {
     return "auth"
 }

 async signIn(credentials: AuthDto): Promise<User | string> {
    if(!credentials.email || !credentials.password) {
        return "Faltan credenciales"
    }
    const user = this.usersRepository.findByEmail(credentials.email, credentials.password);
    if(!user) {
        return "Email o contraseña incorrectos"
    }
}
}
 