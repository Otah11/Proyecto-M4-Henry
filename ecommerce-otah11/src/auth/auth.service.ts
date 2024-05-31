/*  eslint-disable prettier/prettier */
import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { LoginUserDto } from "./auth.dto";
import { User } from "src/users/users.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDto } from "src/users/createUser.dto";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService
    ) {}

    async signUp(user: CreateUserDto): Promise<Omit<User, 'password'>> {
        if (user.password !== user.confirmPassword) {
            throw new BadRequestException('Passwords do not match');
        }

        const userFound = await this.userRepository.findOne({ where: { email: user.email } });
        if (userFound) {
            throw new BadRequestException('User already exists, please sign in.');
        }

        const hashedPassword = await bcrypt.hash(user.password, 10);
        if (!hashedPassword) {
            throw new BadRequestException('Error hashing password');
        }

        const newUser = this.userRepository.create({ ...user, password: hashedPassword });
        await this.userRepository.save(newUser);

        const { password, ...userWithoutPassword } = newUser;
        return userWithoutPassword;
    }

    async signIn(credentials: LoginUserDto) {
        const user = await this.userRepository.findOne({
            where: { email: credentials.email },
            select: ['id', 'roles', 'email', 'password']
        });

        if (!user) {
            throw new BadRequestException('User not found');
        }

        const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid password');
        }

        const userPayload = {
            id: user.id,
            email: user.email,
            roles: user.roles
        };

        const token = this.jwtService.sign(userPayload);
        return {
            message: "User logged in successfully",
            token
        };
    }
}
