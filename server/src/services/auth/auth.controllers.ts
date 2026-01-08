import {
  Controller,
  Post,
  UseGuards,
  Get,
  Body,
  Res,
  Req,
  Put,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public, ResponseMessage, User } from '../../decorator/customize';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import type { Request, Response } from 'express';
import type { IUser } from '../../interface/users.interface';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UpdateUserDto } from '../users/dto/update-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  @ResponseMessage('User login')
  handleLogin(@Req() req, @Res({ passthrough: true }) response: Response) {
    return this.authService.login(req.user, response);
  }

  // Chỉ dùng cho /profile
  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  getProfile(@Req() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Put('/profile/upate')
  @ResponseMessage('Update info success')
  handleUpdateProfile(
    @Body() data: UpdateUserDto,
    @User() user: IUser,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.authService.updateProfile(data, user, response);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/password/upate')
  @ResponseMessage('Update password success')
  handleUpdatePassword(@Body() updateUserDto: UpdateUserDto, @Req() req) {
    return this.authService.updatePassword(updateUserDto, req.user);
  }

  @Public()
  @ResponseMessage('Register a new user')
  @Post('/register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @ResponseMessage('Get user infomation')
  @Get('/account')
  handleGetProfile(@User() user: IUser) {
    return { user };
  }

  @Public()
  @ResponseMessage('Get refresh token')
  @Get('/refresh')
  handleRefreshToken(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const refresh_token = request.cookies['refresh_token'];
    return this.authService.refreshToken(refresh_token, response);
  }

  @Public()
  @ResponseMessage('Logout user')
  @Post('/logout')
  handleLogout(
    @User() user: IUser,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.authService.logout(user, response);
  }
}
