import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/users/user.service';

@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService,
    private config: ConfigService,
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
  ) {}

  async signToken(userId: string, role: string): Promise<string> {
    const payload = {
      id: userId,
      role,
    };

    return this.jwt.signAsync(payload, {
      secret: this.config.get('SECRET_KEY'),
      expiresIn: '10h',
    });
  }

  async validateCredentials(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new HttpException('Wrong email or password!', HttpStatus.FORBIDDEN);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new HttpException('Wrong email or password!', HttpStatus.FORBIDDEN);
    }

    return user;
  }

  async validateByToken(id: string) {
    const user = await this.userService.findByToken(id);

    return user;
  }
}
