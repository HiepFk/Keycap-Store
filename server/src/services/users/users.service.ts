import { Injectable, ConflictException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { genSaltSync, hashSync, compareSync } from 'bcryptjs';
import aqp from 'api-query-params';
import { User } from '../../decorator/customize';
import { User as UserM, UserDocument } from './schemas/user.schemas';
import type { IUser } from 'src/interface/users.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UserM.name) private userModel: Model<UserDocument>,
  ) {}

  getHasPassword = (pass: string) => {
    const salt = genSaltSync(10);
    const hash = hashSync(pass, salt);
    return hash;
  };

  isValidPassword(password: string, hash: string) {
    return compareSync(password, hash);
  }

  async create(createUserDto: CreateUserDto, @User() user: IUser) {
    const existingUser = await this.userModel.findOne({
      email: createUserDto.email,
      isDeleted: { $ne: true }, // nếu có dùng soft delete
    });

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    createUserDto.password = this.getHasPassword(createUserDto.password);
    let newUser = await this.userModel.create({
      ...createUserDto,
      createdBy: new mongoose.Types.ObjectId(user._id),
    });
    return newUser;
  }

  async register(createUserDto: CreateUserDto) {
    const existingUser = await this.userModel.findOne({
      email: createUserDto.email,
      isDeleted: { $ne: true }, // nếu có dùng soft delete
    });

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    createUserDto.password = this.getHasPassword(createUserDto.password);
    let newUser = await this.userModel.create({
      ...createUserDto,
      role: '66b8a1000000000000000001',
    });
    return newUser;
  }

  async findAll(currentPage: number, limit: number, query: any) {
    const { filter, sort, projection, population } = aqp(query);

    // Áp dụng điều kiện soft delete (lọc những bản ghi chưa bị xóa)
    const baseFilter = {
      ...filter,
      isDeleted: { $ne: true },
    };

    const offset = (currentPage - 1) * limit;
    const defaultLimit = limit || 10;

    const totalItems = await this.userModel.countDocuments(baseFilter);
    const totalPages = Math.ceil(totalItems / defaultLimit);

    const result = await this.userModel
      .find(baseFilter, projection as mongoose.ProjectionType<UserM>)
      .skip(offset)
      .limit(defaultLimit)
      .sort(sort as any)
      .populate(population)
      .select('-password') // <== loại bỏ field password
      .exec();

    return {
      meta: {
        current: currentPage,
        pageSize: defaultLimit,
        pages: totalPages,
        total: totalItems,
      },
      result,
    };
  }

  async findOne(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) return 'not found user';

    return await this.userModel
      .findOne({
        _id: id,
      })
      .select('-password');
  }

  async findOneByUsername(userName: string) {
    return await this.userModel.findOne({ email: userName });
  }

  async update(id: string, updateUserDto: UpdateUserDto, @User() user: IUser) {
    if (!mongoose.Types.ObjectId.isValid(id)) return 'not found user';

    return await this.userModel.updateOne(
      { _id: id },
      {
        ...updateUserDto,
        updatedBy: {
          _id: new mongoose.Types.ObjectId(user._id),
          email: user.email,
        },
      },
    );
  }

  async remove(id: string, @User() user: IUser) {
    return await this.userModel.updateOne(
      { _id: id },
      {
        $set: {
          isDeleted: true,
          deletedAt: new Date(),
          deletedBy: {
            _id: new mongoose.Types.ObjectId(user._id),
            email: user.email,
          },
        },
      },
    );
  }

  updateUserToken = async (refreshToken: string, _id: string) => {
    return await this.userModel.updateOne(
      { _id },
      {
        refreshToken,
      },
    );
  };

  findUserBytoken = async (refreshToken: string) => {
    return await this.userModel.findOne({ refreshToken });
  };
}
