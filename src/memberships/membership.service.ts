import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { msDto } from './dtos';
import { msPatchDto } from './dtos/membership-patch.dto';
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

  async editMemberShip(mId: string, body: msPatchDto) {
    const updates = Object.keys(body);

    try {
      const membership = await this.msModel.findById(mId);
      if (!membership) return new NotFoundException();

      updates.forEach((update) => {
        membership[update] = body[update];
      });

      await membership.save();

      return membership;
    } catch (error) {
      return error;
    }
  }

  async deleteMemberShipById(mId: string) {
    try {
      const deletedMembership = await this.msModel.findByIdAndDelete(mId);
      if (!deletedMembership) throw new NotFoundException();

      return deletedMembership;
    } catch (error) {
      return error;
    }
  }
}
