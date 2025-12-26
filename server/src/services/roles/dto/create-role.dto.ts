import {
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateRoleDto {
  @IsString({ message: 'Tên vai trò phải là chuỗi ký tự.' })
  @IsNotEmpty({ message: 'Tên vai trò không được để trống.' })
  name: string;

  @IsArray({ message: 'Danh sách quyền phải là một mảng ID.' })
  @IsMongoId({ each: true, message: 'Mỗi quyền phải là một ObjectId hợp lệ.' })
  @IsOptional()
  permissions?: string[]; // tên cũ trong schema là `Roles`, nên đổi thành `permissions`
}
