/* eslint-disable @typescript-eslint/no-unused-vars */

import { Injectable } from "@nestjs/common";
import { User } from "./users.interface";

@Injectable()
export class UsersRepository {
    private users = [
        {
        id: 1,
        email: 'tobi@mail.com',
        name: 'Tobias',
        password: '111111',
        address: 'Calle falsa 111',
        phone: '111111111',
        country: 'Argentina',
        city: 'Buenos Aires'
    },{
        id: 2,
        email: 'juan@mail.com',
        name: 'Juan',
        password: '222222',
        address: 'Calle falsa 222',
        phone: '2222222222',
        country: 'Argentina',
        city: ''
    },{
        id: 3,
        email: 'maxi@mail.com',
        name: 'Maxi',
        password: '333333',
        address: 'Calle falsa 333',
        phone: '3333333333',
        country: '',
        city: ''
    },
    {
        id: 4,
        email: 'lopez@gmail.com',
        name: 'Lopez',
        password: '456',
        address: 'avenida siempre viva 742',
        phone: '456456456', 
        country: 'Peru',
        city: 'Lima',
    },
    {
        id: 5,
        email: 'martinez@gmail.com',
        name: 'Martinez',
        password: '789',
        address: 'calle mayor 4',
        phone: '789789789', 
        country: 'Chile',
        city: 'Santiago',
    },
    {
        id: 6,
        email: 'gomez@gmail.com',
        name: 'Gomez',
        password: '101112',
        address: 'calle real 56',
        phone: '101010101', 
        country: 'Uruguay',
        city: 'Montevideo',
    },
    {
        id: 7,
        email: 'hernandez@gmail.com',
        name: 'Hernandez',
        password: '131415',
        address: 'avenida central 78',
        phone: '111222333', 
        country: 'Paraguay',
        city: 'Asuncion',
    },
    {
        id: 8,
        email: 'garcia@gmail.com',
        name: 'Garcia',
        password: '161718',
        address: 'calle segunda 9',
        phone: '444555666', 
        country: 'Mexico',
        city: 'Mexico City',
    },
    {
        id: 9,
        email: 'fernandez@gmail.com',
        name: 'Fernandez',
        password: '192021',
        address: 'calle tercera 10',
        phone: '777888999', 
        country: 'Venezuela',
        city: 'Caracas',
    },
        
    ];

    async getUsers(pageNumber: number, limitNumber: number) : Promise<Omit<User, 'password'>[]> {
        const startIndex = (pageNumber - 1) * limitNumber;
        // const endIndex = pageNumber * limitNumber;
        const endIndex = startIndex + Number(limitNumber);
        const users = this.users.slice(startIndex, endIndex).map(({ password, ...userWithoutPassword }) => userWithoutPassword);
        return users;
    }
    async getUserById(id: number) : Promise<Omit<User, 'password'>> {
        // return this.users.find((user) => user.id === id);
        const noPasswordUser = this.users.find((user) => user.id === id);
        const { password, ...rest } = noPasswordUser;
        return rest;
    }  
    async createUser(user: Omit<User, 'id'>) : Promise<number> {
        const id = this.users.length + 1;
        this.users = [...this.users, { ...user, id }];
        return id;
    }
    async updateUser(id: number, user: Partial<User>) :Promise<number> {
        const index = this.users.findIndex(user => user.id === id);
        this.users[index] = { ...this.users[index], ...user };
        return index;
    }
    async deleteUser(id: number): Promise<number> {
        const i = this.users.findIndex(user => user.id === id);
        this.users.splice(i, 1);
        return i;
    }

    async findByEmail(email: string, password: string): Promise<User | null> {
        //quitar el password
        const user = this.users.find((user)=> user.email === email && user.password === password);
        return user ? user : null;
    }
}
//el probrema esta en el array de users, con los objetos opcionales country y city

// import { Injectable, NotFoundException } from "@nestjs/common";
// import { User } from "./users.interface";

// @Injectable()
// export class UsersRepository {
//     private users: User[] = [
//         {
//             id: 1,
//             email: 'tobi@mail.com',
//             name: 'Tobias',
//             password: '111111',
//             address: 'Calle falsa 111',
//             phone: '111111111',
//             country: 'Argentina',
//             city: 'Buenos Aires'
//         },
//         {
//             id: 2,
//             email: 'juan@mail.com',
//             name: 'Juan',
//             password: '222222',
//             address: 'Calle falsa 222',
//             phone: '2222222222',
//             country: 'Argentina'
//         },
//         {
//             id: 3,
//             email: 'maxi@mail.com',
//             name: 'Maxi',
//             password: '333333',
//             address: 'Calle falsa 333',
//             phone: '3333333333'
//         }
//     ];

//     async getUsers(): Promise<User[]> {
//         return this.users;
//     }

//     async getUserById(id: number): Promise<User | undefined> {
//         return this.users.find(user => user.id === id);
//     }

//     async createUser(user: Omit<User, 'id'>): Promise<number> {
//         const id = this.users.length + 1;
//         this.users = [...this.users, { ...user, id }];
//         return id;
//     }

//     updateUser(id: number, user: Partial<User>): void {
//         const index = this.users.findIndex(existingUser => existingUser.id === id);

//         if (index === -1) {
//             throw new NotFoundException(`User with id ${id} not found.`);
//         }

//         const updatedUser = { ...this.users[index], ...user };

//         if (!this.isUserValid(updatedUser)) {
//             throw new Error('Updated user is not valid.');
//         }

//         this.users[index] = updatedUser;
//     }

//     private isUserValid(user: User): boolean {
//         return (
//             typeof user.id === 'number' &&
//             typeof user.email === 'string' &&
//             typeof user.name === 'string' &&
//             typeof user.password === 'string' &&
//             typeof user.address === 'string' &&
//             typeof user.phone === 'string' &&
//             (user.country === undefined || typeof user.country === 'string') &&
//             (user.city === undefined || typeof user.city === 'string')
//         );
//     }
// }
