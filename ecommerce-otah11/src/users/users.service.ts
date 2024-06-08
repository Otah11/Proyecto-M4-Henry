/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { User } from "./users.entity";
import { UserRepository } from "./users.repository";

@Injectable()
export class UsersService {
    
    constructor(private readonly userRepository: UserRepository) {}

    async getUsers(page: number, limit: number): Promise<User[]> {
        return await this.userRepository.getUsers(page, limit);
    }

    async getUserById(id: string): Promise<User>{
        return await this.userRepository.getUserById(id);
    }

    async updateUser(id: string, user: Partial<User>) : Promise<User> {
        return await this.userRepository.updateUser(id, user);
    }

    async deleteUser(id: string): Promise<Object>{
        const user = await this.userRepository.deleteUser(id);
        return  {message: "Usuario eliminado", user: user}
    }
}