import {
  IsEmail,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
  Matches,
} from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'Tên người dùng phải là chuỗi ký tự.' })
  @IsNotEmpty({ message: 'Tên người dùng không được để trống.' })
  name: string;

  @IsEmail({}, { message: 'Email không hợp lệ.' })
  @IsNotEmpty({ message: 'Email không được để trống.' })
  email: string;

  @IsString({ message: 'Mật khẩu phải là chuỗi ký tự.' })
  @MinLength(6, { message: 'Mật khẩu phải có ít nhất 8 ký tự.' })
  password: string;

  @IsOptional()
  @Matches(/^[0-9]{9,15}$/, { message: 'Số điện thoại không hợp lệ.' })
  phone?: string;

  @IsOptional()
  @IsMongoId({ message: 'ID vai trò không hợp lệ.' })
  role?: string;
}
