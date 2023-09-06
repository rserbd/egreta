import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { jwtConstants } from './constants';
import { Request } from 'express';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        JwtStrategy.extractJWT,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(jwt: any): Promise<any> {
    const foundUser = await this.authService.validateUser(
      jwt.email,
      jwt.password,
    );
    if (!foundUser) {
      throw new UnauthorizedException();
    }
    return foundUser;
  }

  private static extractJWT(req: Request): string | null {
    if (req.cookies && 'jwt' in req.cookies) {
      return req.cookies.jwt;
    }
    return null;
  }
}
