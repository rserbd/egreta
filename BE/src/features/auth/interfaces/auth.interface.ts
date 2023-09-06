import { User } from 'src/entities/user.entity';
import { LoginDTO } from '../dto/login.dto';
import { RegisterDTO } from '../dto/register.dto';
import { Response, Request } from 'express';

export interface AuthInterface {
  register(user: RegisterDTO): Promise<{ message: string }>;
  login(
    loginCredentials: LoginDTO,
    res: Response,
  ): Promise<{ message: string }>;
  findLoggedUser(req: Request): Promise<User>;
  logout(res: Response): Promise<{ message: string }>;
}
