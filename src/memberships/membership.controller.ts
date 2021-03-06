import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { JwtGuard } from 'src/auth/guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { ROLE } from 'src/auth/roles/role.enum';
import { msDto } from './dtos';
import { msPatchDto } from './dtos/membership-patch.dto';
import { MembershipService } from './membership.service';

@Controller('memberships')
export class MembershipController {
  constructor(private msService: MembershipService) {}

  @Post()
  @Roles(ROLE.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  addMemberShip(@Body() dto: msDto) {
    return this.msService.addMemberShip(dto);
  }

  @Get()
  viewMemberShips() {
    return this.msService.getAllMemberShips();
  }

  @Patch(':id')
  @Roles(ROLE.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  editMemberShip(@Param('id') mId: string, @Body() body: msPatchDto) {
    return this.msService.editMemberShip(mId, body);
  }

  @Delete(':id')
  @Roles(ROLE.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  deleteMemberShip(@Param('id') mId: string) {
    return this.msService.deleteMemberShipById(mId);
  }
}
