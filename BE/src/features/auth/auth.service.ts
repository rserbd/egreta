import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { Repository } from 'typeorm';
import { Response, Request } from 'express';
import { RegisterDTO } from './dto/register.dto';
import { LoginDTO } from './dto/login.dto';
import { AuthInterface } from './interfaces/auth.interface';

@Injectable()
export class AuthService implements AuthInterface {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(user: RegisterDTO): Promise<{ message: string }> {
    try {
      if (user.password !== user.passwordConfirm) {
        throw new BadRequestException('Credențiale invalide');
      }
      const salt = await bcrypt.genSalt();
      const hashPassword = await bcrypt.hash(user.password, salt);
      user.password = hashPassword;
      await this.userRepository.save(user);
      return { message: 'Cont creat cu succes!' };
    } catch (err) {
      console.error(err);
      if (err.code === 'SQLITE_CONSTRAINT') {
        throw new BadRequestException('Email deja folosit');
      }
      throw err;
    }
  }

  async login(
    loginCredentials: LoginDTO,
    response: Response,
  ): Promise<{ message: string }> {
    const user = await this.userRepository.findOne({
      where: { email: loginCredentials.email },
      select: ['id', 'email', 'password'],
    });

    if (!user) {
      throw new BadRequestException('Utilizator inexistent');
    }
    if (!(await bcrypt.compare(loginCredentials.password, user.password))) {
      throw new BadRequestException('Credențiale invalide');
    }

    const jwt = await this.jwtService.signAsync({
      id: user.id,
      email: user.email,
      password: user.password,
    });
    response.cookie('jwt', jwt, { httpOnly: true });
    return {
      message: 'Autentificare cu succes!',
    };
  }

  async findLoggedUser(req: Request): Promise<User> {
    const cookie = req.cookies['jwt'];
    const data = await this.jwtService.verifyAsync(cookie);
    if (!data) {
      throw new UnauthorizedException();
    }

    const user = await this.userRepository.findOne({
      where: { id: data['id'] },
    });

    return user;
  }

  async findUserById(id: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async validateUser(email: string, password: string): Promise<any> {
    const foundUser = await this.userRepository.findOne({
      where: {
        email: email,
      },
      select: ['id', 'email', 'password'],
    });

    if (foundUser) {
      if (password === foundUser.password) {
        return foundUser;
      }
      return null;
    }
    return null;
  }

  public async logout(res: Response): Promise<{ message: string }> {
    try {
      res.clearCookie('jwt');
      return {
        message: 'Deconectare cu succes!',
      };
    } catch (error) {
      console.error(error);
    }
  }
}
