import { Module, Global } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/users.module';
import { ProductModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import typeOrmConfig from './config/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from './category/category.module';
import { OrdersModule } from './orders/orders.module';


@Global()
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [typeOrmConfig]}),
    TypeOrmModule.forRootAsync({inject: [ConfigService], useFactory: (configService: ConfigService) => configService.get('typeorm') }),
    UserModule, ProductModule, AuthModule, CategoryModule, OrdersModule, ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}