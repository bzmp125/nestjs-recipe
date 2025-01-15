import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './transform.interceptor';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AuthModule } from './auth/auth.module';
import { TasksModule } from './tasks/tasks.module';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor());

  if (process.env.STAGE!='prod') { // don't setup swagger on prod
    const options = new DocumentBuilder()
    .setTitle('NestJs Recipes - API Docs')
    .setDescription('Documentation for the NestJs Recipes API.')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

    const documentation = SwaggerModule.createDocument(app, options, {
      include: [
        AppModule,
        AuthModule,
        TasksModule
      ],
    });

    SwaggerModule.setup(`/docs`, app, documentation);
  }


  const port = process.env.PORT;
  await app.listen(port);
  logger.log(`Application listening on port ${port}`);
}
bootstrap();
