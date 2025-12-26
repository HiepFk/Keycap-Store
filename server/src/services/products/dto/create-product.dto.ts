import {
  IsString,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsArray,
  ValidateNested,
  IsEnum,
  Min,
  IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';

class InTheBoxDto {
  @IsNumber({}, { message: 'Số lượng phải là số' })
  @Min(1, { message: 'Số lượng phải lớn hơn hoặc bằng 1' })
  count: number;

  @IsString({ message: 'Nội dung trong hộp phải là chuỗi' })
  @IsNotEmpty({ message: 'Nội dung trong hộp không được để trống' })
  content: string;
}

export enum ProductCategory {
  KEYBOARDS = 'keyboards',
  KEYCAPS = 'keycaps',
  DESKMATS = 'deskmats',
}

export class CreateProductDto {
  // Images
  @IsString({ message: 'Ảnh chính (src) phải là chuỗi' })
  @IsNotEmpty({ message: 'Ảnh chính (src) không được để trống' })
  src: string;

  @IsOptional()
  @IsString({ message: 'Ảnh trên phải là chuỗi' })
  topSrc?: string;

  @IsOptional()
  @IsString({ message: 'Ảnh dưới phải là chuỗi' })
  botSrc?: string;

  @IsOptional()
  @IsString({ message: 'Ảnh chi tiết phải là chuỗi' })
  rightSrc?: string;

  // Status
  @IsOptional()
  @IsBoolean({
    message: 'Trạng thái sản phẩm mới (nu) phải là true hoặc false',
  })
  nu?: boolean;

  // Content
  @IsString({ message: 'Tiêu đề sản phẩm (header) phải là chuỗi' })
  @IsNotEmpty({ message: 'Tiêu đề sản phẩm (header) không được để trống' })
  header: string;

  @IsString({ message: 'Phụ đề sản phẩm (subheader) phải là chuỗi' })
  @IsNotEmpty({ message: 'Phụ đề sản phẩm (subheader) không được để trống' })
  subheader: string;

  @IsString({ message: 'Mô tả sản phẩm (text) phải là chuỗi' })
  @IsNotEmpty({ message: 'Mô tả sản phẩm (text) không được để trống' })
  text: string;

  @IsOptional()
  @IsString({ message: 'Thông tin tính năng phải là chuỗi' })
  features?: string;

  // In the box
  @IsOptional()
  @IsArray({ message: 'Danh sách trong hộp phải là mảng' })
  @ValidateNested({ each: true })
  @Type(() => InTheBoxDto)
  inthebox?: InTheBoxDto[];

  // Price
  @IsNumber({}, { message: 'Giá sản phẩm phải là số' })
  @Min(0, { message: 'Giá sản phẩm không được nhỏ hơn 0' })
  price: number;

  // Category
  @IsEnum(ProductCategory, {
    message: 'Danh mục chỉ chấp nhận: keyboards, keycaps, deskmats',
  })
  category: ProductCategory;
}
