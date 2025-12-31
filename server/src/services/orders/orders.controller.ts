import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { ResponseMessage } from 'src/decorator/customize';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  /* ================= CREATE ================= */

  @Post()
  @ResponseMessage('Tạo đơn hàng thành công')
  create(@Body() createOrderDto: CreateOrderDto) {
    const mockUserId = 'USER_ID_HERE'; // thay bằng auth thực tế
    return this.ordersService.create(createOrderDto, mockUserId);
  }

  /* ================= FIND ALL ================= */

  @Get()
  @ResponseMessage('Lấy danh sách đơn hàng thành công')
  findAll() {
    return this.ordersService.findAll();
  }

  /* ================= FIND ONE (CHI TIẾT ĐƠN HÀNG) ================= */

  @Get(':id')
  @ResponseMessage('Lấy chi tiết đơn hàng thành công')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(id);
  }

  /* ================= DELETE ================= */

  @Delete(':id')
  @ResponseMessage('Xoá đơn hàng thành công')
  remove(@Param('id') id: string) {
    const mockUserId = 'USER_ID_HERE'; // thay bằng auth
    return this.ordersService.remove(id, mockUserId);
  }
}
