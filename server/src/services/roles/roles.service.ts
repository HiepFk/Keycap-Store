import { ConflictException, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Role as RoleM, RoleDocument } from './schemas/role.schemas';
import { Model } from 'mongoose';

@Injectable()
export class RolesService {
  constructor(
    @InjectModel(RoleM.name) private roleModel: Model<RoleDocument>,
  ) {}
  create(createRoleDto: CreateRoleDto) {
    return 'This action adds a new role';
  }

  findAll() {
    return `This action returns all roles`;
  }

  async findOne(id: number | string) {
    const role = await this.roleModel.findById(id);
    if (!role) {
      throw new ConflictException('Not has user role');
    }

    return role?.name;
  }

  async findRoleByName(name: string) {
    const role: any = await this.roleModel.findOne({ name });
    if (!role) {
      throw new ConflictException('Not has user role');
    }

    return role?._id;
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${id} role`;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
