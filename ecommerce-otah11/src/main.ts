import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerMiddleware } from './middleware/loggerGlobal';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,}));
    
  app.use(LoggerMiddleware)
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Ecommerce J.A.Araujo')
    .setDescription('Ecommerce API construida con Nest')
    .setVersion('1.0')
    .addBearerAuth()//añade la autenticación (Bearer)
    .build();
    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
