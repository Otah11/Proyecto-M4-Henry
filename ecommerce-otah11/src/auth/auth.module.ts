/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/users/users.entity";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET'),
                signOptions: { expiresIn: '60m' },
            }),
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService],
    exports: [AuthService],  // Exportar si otros módulos necesitan usar AuthService
})
export class AuthModule {}
