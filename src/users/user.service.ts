import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { LoginDto, UserDto } from './dto';
import { User } from './user.model';
import { AuthService } from 'src/auth/auth.service';
import { Membership } from 'src/memberships/membership.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    @InjectModel('Membership') private readonly msModel: Model<Membership>,
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

  async getUser(userId: string) {
    try {
      const user = await this.userModel.findById(userId);
      if (!user) throw new NotFoundException();

      delete user.password;
      return user;
    } catch (error) {
      return error;
    }
  }

  async sellMemberShip(userId: string, msId: string, startDay: string) {
    try {
      const user = await this.userModel.findById(userId);
      const membership = await this.msModel.findById(msId);
      if (!user || !membership) throw new NotFoundException();

      const start = new Date(startDay);

      const expireDate = this.calculateExpirationDate(
        start,
        membership.numberOfDays,
      );

      user.memberShip.push({
        starts: start,
        expires: expireDate,
        name: membership.name,
        occassionsLeft: membership.numberOfOccasion,
      });

      await user.save();

      return user.memberShip;
    } catch (error) {
      return error;
    }
  }

  calculateExpirationDate(start: Date, daysToAdd: number) {
    const expireDate = new Date(start);

    const day = expireDate.getDate();
    expireDate.setDate(day + daysToAdd);

    return expireDate;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return await this.userModel.findOne({ email });
  }

  async findByToken(id: string): Promise<User | undefined> {
    return await this.userModel.findById(id);
  }
}
