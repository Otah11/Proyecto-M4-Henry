/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./users.entity";
import { Repository } from "typeorm";
import { OrdersService } from '../orders/orders.service';

@Injectable()
export class UsersService {
    
    constructor(@InjectRepository(User) private readonly usersRepository: Repository<User>, private readonly orderService: OrdersService
        ) {}

    async getUsers(pageNumber: number, limitNumber: number): Promise<User[]> {
        const [users] = await this.usersRepository.findAndCount({ 
            skip: (pageNumber - 1) * limitNumber,
            take: limitNumber,
            relations: { orders: true},
            
         });
        return users;
    }
    async getUserById(id: string): Promise<User> {
       const userFound= await this.usersRepository.findOne({where:{id: id}, 
        relations: { orders: true}, 
        
    });
       return userFound
    }

      
    
    async updateUser(id: string, user: Partial<User>) : Promise<User> {
        const foundUser = await this.usersRepository.findOne({where:{id: id}});
        Object.assign(foundUser, user);
        await this.usersRepository.save(foundUser);
        return foundUser;
    }
    async deleteUser(id: string): Promise<User> {
        const foundUser = await this.usersRepository.findOne({where:{id: id}});
        if(!foundUser){
            throw new NotFoundException('User not found');
        }
        await this.orderService.deleteOrdersByUserId(id);

        await this.usersRepository.delete(foundUser);
        return foundUser
    }
}