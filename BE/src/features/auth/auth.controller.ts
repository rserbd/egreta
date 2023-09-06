import {
  ClassSerializerInterceptor,
  Controller,
  UnauthorizedException,
} from '@nestjs/common';
import {
  Body,
  Post,
  Res,
  Get,
  Req,
  UseInterceptors,
} from '@nestjs/common/decorators';
import { Response, Request } from 'express';
import { RegisterDTO } from './dto/register.dto';
import { LoginDTO } from './dto/login.dto';
import { AuthService } from './auth.service';
import { User } from 'src/entities/user.entity';

@Controller('api/auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  public async register(
    @Body() user: RegisterDTO,
  ): Promise<{ message: string }> {
    return await this.authService.register(user);
  }

  @Post('login')
  public async login(
    @Body() loginCredentials: LoginDTO,
    @Res({ passthrough: true }) res: Response,
  ): Promise<{ message: string }> {
    return await this.authService.login(loginCredentials, res);
  }

  @Get('loggedUser')
  public async findLoggedUser(@Req() req: Request): Promise<User> {
    try {
      return await this.authService.findLoggedUser(req);
    } catch {
      throw new UnauthorizedException();
    }
  }

  @Post('logout')
  public async logout(
    @Res({ passthrough: true }) res: Response,
  ): Promise<{ message: string }> {
    return await this.authService.logout(res);
  }
}
