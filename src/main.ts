import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const config = new DocumentBuilder()
    .setTitle('Auctions example')
    .setDescription('The Auctions API description')
    .setVersion('1.0')
    .addTag('Auctions')
    .build();

  const app = await NestFactory.create(AppModule);

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(5000);
}
bootstrap();
