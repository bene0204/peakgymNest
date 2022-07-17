import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { LoginDto, UserDto } from './dto';
import { User } from './user.model';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    @Inject(forwardRef(() => AuthService))
    private auth: AuthService,
  ) {}

  async addUser(body: UserDto): Promise<User> {
    const user = new this.userModel(body);
    try {
      user.password = await bcrypt.hash(user.password, 8);
      await user.save();

      delete user.password;

      return user;
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async loginUser(input: LoginDto): Promise<{ access_token: string }> {
    const user = await this.auth.validateCredentials(
      input.email,
      input.password,
    );

    const token = await this.auth.signToken(user.id, user.role);

    return {
      access_token: token,
    };
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return await this.userModel.findOne({ email });
  }

  async findByToken(id: string): Promise<User | undefined> {
    return await this.userModel.findById(id);
  }
}
