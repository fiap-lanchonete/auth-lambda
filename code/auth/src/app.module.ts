import { ClassSerializerInterceptor, Global, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { PrismaHelper } from './adapters/database/helpers/prisma.helper';
import { UserRepository } from './adapters/database/repositories/user.repository';
import { LoginService } from './application/usecases/login.service';
import { RegisterService } from './application/usecases/register.service';
import { AnonymousService } from './application/usecases/anonymous.service';
import { AuthController } from './adapters/controllers/auth.controller';
import { config } from 'dotenv';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './core/config/jwt.strategy';
import { UserService } from './application/services/user.service';
config()

@Global()
@Module({
  imports: [
    JwtModule.register({
      secret: `${process.env.JWT_SECRET_KEY}`,
      signOptions: { expiresIn: '30mn' },
    }),
  ],
  controllers: [
    AuthController
  ],
  providers: [
    UserService,
    LoginService,
    RegisterService,
    AnonymousService,
    {
      provide: 'UserRepository',
      useClass: UserRepository,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
    JwtService,
    JwtStrategy,
    PrismaHelper
  ],
  exports: [
    UserService,
    JwtService,
    JwtStrategy,
    PrismaHelper,
    {
      provide: 'UserRepository',
      useClass: UserRepository,
    },
  ]
})
export class AppModule {}
