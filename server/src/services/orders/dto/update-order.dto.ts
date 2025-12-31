import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from './create-order.dto';

export class UpdatePermissionDto extends PartialType(CreateOrderDto) {}
