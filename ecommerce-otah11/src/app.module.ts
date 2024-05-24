import { Module, Global, /* NestModule, MiddlewareConsumer,*/  } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/users.module';
import { ProductModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
// import { LoggerMiddleware } from './middleware/loggerGlobal';

@Global()
@Module({
  imports: [UserModule, ProductModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
// export class AppModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer.apply(LoggerMiddleware).forRoutes('');
//   }
// }
export class AppModule {}