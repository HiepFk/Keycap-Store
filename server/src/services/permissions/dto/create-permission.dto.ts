import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePermissionDto {
  @IsString({ message: 'Tên quyền phải là một chuỗi ký tự.' })
  @IsNotEmpty({ message: 'Tên quyền không được để trống.' })
  name: string; // Ví dụ: 'create_user', 'update_job'
}
