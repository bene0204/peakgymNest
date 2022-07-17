import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
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
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtGuard)
  getCurrentUser(@GetUser() user: User) {
    return user;
  }
}
