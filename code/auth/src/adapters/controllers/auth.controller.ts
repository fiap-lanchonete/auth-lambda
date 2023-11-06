import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { LoginDTO } from 'src/application/dtos/login.dto';
import { RegisterDTO } from 'src/application/dtos/register.dto';
import { AnonymousService } from 'src/application/usecases/anonymous.service';
import { LoginService } from 'src/application/usecases/login.service';
import { RegisterService } from 'src/application/usecases/register.service';

@ApiTags('Autenticação')
@Controller('v1/auth')
export class AuthController {
  constructor(
    private readonly loginService: LoginService,
    private readonly registerService: RegisterService,
    private readonly anonymousService: AnonymousService
  ){}

  @ApiOperation({ summary: 'Realiza login em modo anônimo' })
  @ApiBody({ type: LoginDTO })
  @ApiResponse({ status: 201, description: 'Login realizado criado com sucesso' })
  @ApiResponse({ status: 403, description: 'Login não autorizado' })
  @Post("login/anonymous")
  async anonymous() {
    return await this.anonymousService.execute()
  }

  @ApiOperation({ summary: 'Fazer Login' })
  @ApiBody({ type: LoginDTO })
  @ApiResponse({ status: 201, description: 'Login realizado criado com sucesso' })
  @ApiResponse({ status: 403, description: 'Login não autorizado' })
  @Post("login")
  async login(@Body() data: LoginDTO) {
    return await this.loginService.execute(data)
  }

  @ApiOperation({ summary: 'Fazer Registro' })
  @ApiBody({ type: LoginDTO })
  @ApiResponse({ status: 201, description: 'Registro realizado com sucesso' })
  @ApiResponse({ status: 403, description: 'Registro não autorizado' })
  @Post("/register")
  async register(@Body() data: RegisterDTO) {
    return await this.registerService.execute(data)
  }
}
