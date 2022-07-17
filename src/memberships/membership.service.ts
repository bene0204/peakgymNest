import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { msDto } from './dtos';
import { Membership } from './membership.model';

@Injectable()
export class MembershipService {
  constructor(
    @InjectModel('Membership') private readonly msModel: Model<Membership>,
  ) {}

  async addMemberShip(body: msDto) {
    const membership = new this.msModel(body);
    try {
      await membership.save();

      return membership;
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async getAllMemberShips() {
    try {
      const memberships = await this.msModel.find();

      return memberships;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async editMemberShip(mId: string, body: msDto){
    try {
      let membership = this.msModel.findById(mId);
      if (!membership) return new NotFoundException();

      membership = {
        ...membership,
        ...body,
      }
    } catch (error) {
      return error;
    }
    
  }
}
