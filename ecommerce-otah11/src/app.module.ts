import { Module, Global } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/users.module';
import { ProductModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import typeOrmConfig from './config/typeorm.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from './category/category.module';
import { OrdersModule } from './orders/orders.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { JwtModule } from '@nestjs/jwt';
import {config as dotenvConfig} from "dotenv"
import { AutomaticSeederModule } from './automaticSeeder/automaticSeeder.module';

dotenvConfig({path: '.development.env'})

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({ 
      isGlobal: true, load: [typeOrmConfig]
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService], useFactory: (configService: ConfigService) => configService.get('typeorm') 
    }),
    UserModule, ProductModule, AuthModule, CategoryModule, OrdersModule, CloudinaryModule, AutomaticSeederModule,
  JwtModule.register({
    global: true, secret: process.env.JWT_SECRET, signOptions: { expiresIn: '1h' },
  }) ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}