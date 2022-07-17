import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { JwtGuard } from 'src/auth/guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { ROLE } from 'src/auth/roles/role.enum';
import { UserDto, LoginDto } from './dto';
import { User } from './user.model';

import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  @Roles(ROLE.ADMIN, ROLE.EMPLOYEE)
  @UseGuards(JwtGuard, RolesGuard)
  signUpUser(@Body() dto: UserDto) {
    return this.userService.addUser(dto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  loginUser(@Body() dto: LoginDto) {
    return this.userService.loginUser(dto);
  }

  @Get('me')
  @UseGuards(JwtGuard)
  getCurrentUser(@GetUser() user: User) {
    return user;
  }

  @Get(':uid')
  @Roles(ROLE.ADMIN, ROLE.EMPLOYEE)
  @UseGuards(JwtGuard, RolesGuard)
  getUser(@Param('uid') userId: string) {
    return this.userService.getUser(userId);
  }

  @Patch('sell-membership/:uid/:mid')
  @Roles(ROLE.ADMIN, ROLE.EMPLOYEE)
  @UseGuards(JwtGuard, RolesGuard)
  sellMemberShip(
    @Param('uid') userId: string,
    @Param('mid') msId: string,
    @Query('startDay') startDay: string,
  ) {
    return this.userService.sellMemberShip(userId, msId, startDay);
  }
}
