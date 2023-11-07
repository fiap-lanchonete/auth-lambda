import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import * as compression from 'compression';
import { PrismaHelper } from './adapters/database/helpers/prisma.helper';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { config } from 'dotenv';
import { configure as serverlessExpress } from '@vendia/serverless-express';
config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.enableCors();

  app.use(helmet());
  app.use(compression());

  app.get(PrismaHelper, { strict: false });
  app.enableShutdownHooks();

  const config = new DocumentBuilder()
    .setTitle('Lanchonete Auth API')
    .setDescription('API de Autenticação para a lanchonete')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('v1/doc', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidUnknownValues: true,
      forbidNonWhitelisted: true,
    }),
  );

  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  await app.listen(process.env.PORT || 3002);

  async function gracefulShutdown(signal: NodeJS.Signals) {
    await app.close();
    process.kill(process.pid, signal);
  }

  process.on('SIGINT', gracefulShutdown);
}
bootstrap();

let cachedServer;
export const handler = async (event, context) => {
  if (!cachedServer) {
    const app = await NestFactory.create(AppModule);
    app.enableCors();

    app.use(helmet());
    app.use(compression());
  
    app.get(PrismaHelper, { strict: false });
    app.enableShutdownHooks();
  
    const config = new DocumentBuilder()
      .setTitle('Lanchonete Auth API')
      .setDescription('API de Autenticação para a lanchonete')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('v1/doc', app, document);
  
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidUnknownValues: true,
        forbidNonWhitelisted: true,
      }),
    );
    useContainer(app.select(AppModule), { fallbackOnErrors: true });
    
    await app.init();
    cachedServer = serverlessExpress({
      app: app.getHttpAdapter().getInstance(),
    });

    async function gracefulShutdown(signal: NodeJS.Signals) {
      await app.close();
      process.kill(process.pid, signal);
    }
  
    process.on('SIGINT', gracefulShutdown);
  }
  return cachedServer(event, context);
};