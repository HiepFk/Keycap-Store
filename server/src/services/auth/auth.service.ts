import { Injectable, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import ms from 'ms';
import { Response, Request } from 'express';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { IUser } from 'src/interface/users.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser(email: string, pass: string) {
    const user = await this.usersService.findOneByUsername(email);

    if (user) {
      const isValid = this.usersService.isValidPassword(pass, user.password);
      if (isValid) {
        return user;
      }
    }
    return null;
  }

  async login(user: IUser, response: Response) {
    const { _id, name, email, role } = user;
    const payload = {
      sub: 'token login',
      iss: 'from server',
      _id,
      name,
      email,
      role,
    };

    const refresh_token = this.createRefreshToken(payload);

    await this.usersService.updateUserToken(refresh_token, _id);

    response.cookie('refresh_token', refresh_token, {
      httpOnly: true,
      maxAge: ms(
        this.configService.get<string>('JWT_REFRESH_EXPIRE') as ms.StringValue,
      ),
    });

    return {
      access_token: this.jwtService.sign(payload),
      refresh_token,
      user: {
        // _id,
        name,
        email,
        // role,
      },
    };
  }

  async register(createUserDto: CreateUserDto) {
    let newUser = await this.usersService.register(createUserDto);
    return {
      _id: newUser?._id,
      createAt: newUser?.createdAt,
    };
  }

  createRefreshToken = (payload: any) => {
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      expiresIn:
        ms(
          this.configService.getOrThrow<string>(
            'JWT_REFRESH_EXPIRE',
          ) as ms.StringValue,
        ) / 1000,
    });
    return refreshToken;
  };

  async refreshToken(refresh_token: string, response) {
    try {
      this.jwtService.verify(
        refresh_token,

        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
        },
      );

      let user: any = this.usersService.findUserBytoken(refresh_token);

      if (user) {
        const { _id, name, email, role } = user;
        const payload = {
          sub: 'token refresh',
          iss: 'from server',
          _id,
          name,
          email,
          role,
        };

        const refresh_token = this.createRefreshToken(payload);

        await this.usersService.updateUserToken(refresh_token, _id?.toString());

        response.clearCookie('refresh_token');

        response.cookie('refresh_token', refresh_token, {
          httpOnly: true,
          maxAge: ms(
            this.configService.getOrThrow(
              'JWT_REFRESH_EXPIRE',
            ) as ms.StringValue,
          ),
        });

        return {
          access_token: this.jwtService.sign(payload),
          refresh_token,
          user: {
            _id,
            name,
            email,
            role,
          },
        };
      }
      throw new ConflictException('Refresh hết hạn');
    } catch (error) {
      throw new ConflictException('Refresh hết hạn');
    }
  }

  async logout(user: IUser, response: Response) {
    await this.usersService.updateUserToken('', user?._id);
    response.clearCookie('refresh_token');
    return 'ok';
  }
}
