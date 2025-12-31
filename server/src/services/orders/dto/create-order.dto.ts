import {
  IsString,
  IsNotEmpty,
  IsArray,
  ValidateNested,
  IsEnum,
  IsNumber,
  Min,
  IsOptional,
  IsBoolean,
  Matches,
} from 'class-validator';
import { Type } from 'class-transformer';

/* ================= PRODUCT IN ORDER ================= */

export class CreateOrderProductDto {
  @IsString({ message: 'ID sản phẩm phải là chuỗi' })
  @IsNotEmpty({ message: 'ID sản phẩm không được để trống' })
  productId: string;

  @Type(() => Number)
  @IsNumber({}, { message: 'Số lượng sản phẩm phải là số' })
  @Min(1, { message: 'Số lượng sản phẩm phải lớn hơn hoặc bằng 1' })
  quantity: number;

  @Type(() => Number)
  @IsNumber({}, { message: 'Tổng tiền sản phẩm phải là số' })
  @Min(0, { message: 'Tổng tiền sản phẩm không được nhỏ hơn 0' })
  totalPrice: number;
}

/* ================= MAIN DTO ================= */

export class CreateOrderDto {
  /* ---------- Products ---------- */
  @IsArray({ message: 'Danh sách sản phẩm phải là mảng' })
  @ValidateNested({ each: true })
  @Type(() => CreateOrderProductDto)
  products: CreateOrderProductDto[];

  /* ---------- Pricing ---------- */
  @Type(() => Number)
  @IsNumber({}, { message: 'Phí ship phải là số' })
  @Min(0, { message: 'Phí ship không được nhỏ hơn 0' })
  shippingFee: number;

  /* ---------- Shipping info ---------- */
  @IsString({ message: 'Tên người nhận phải là chuỗi' })
  @IsNotEmpty({ message: 'Tên người nhận không được để trống' })
  receiverName: string;

  @IsString({ message: 'Số điện thoại người nhận phải là chuỗi' })
  @Matches(/^(0|\+84)[0-9]{9}$/, {
    message: 'Số điện thoại người nhận không hợp lệ',
  })
  receiverPhone: string;

  @IsString({ message: 'Địa chỉ nhận hàng phải là chuỗi' })
  @IsNotEmpty({ message: 'Địa chỉ nhận hàng không được để trống' })
  receiverAddress: string;

  /* ---------- Payment ---------- */
  @IsEnum(['cod', 'banking', 'momo', 'vnpay'], {
    message: 'Phương thức thanh toán chỉ chấp nhận: cod, banking, momo, vnpay',
  })
  paymentMethod: string;

  /* ---------- Note ---------- */
  @IsOptional()
  @IsString({ message: 'Ghi chú phải là chuỗi' })
  note?: string;
}
