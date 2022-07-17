import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MembershipService } from './membership.service';
import { MembershipController } from './membership.controller';
import { MembershipSchema } from './membership.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Membership', schema: MembershipSchema },
    ]),
  ],
  providers: [MembershipService],
  controllers: [MembershipController],
})
export class MembershipModule {}
