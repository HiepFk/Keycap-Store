import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { ResponseMessage } from 'src/decorator/customize';
import { LocalAuthGuard } from '../auth/local-auth.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ResponseMessage('Create Order')
  create(@Body() createOrderDto: CreateOrderDto, @Req() req) {
    const authId = req.user?._id;
    return this.ordersService.create(createOrderDto, authId);
  }

  @Get()
  @ResponseMessage('Fetch List Orders')
  findAll(@Query() query: Record<string, any>) {
    const { page = '1', limit = '10', search = '', ...restQuery } = query;

    return this.ordersService.findAll(
      Number(page),
      Number(limit),
      search,
      restQuery,
    );
  }

  @Get(':id')
  @ResponseMessage('Get Detail Order')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(id);
  }

  @Delete(':id')
  @ResponseMessage('Remove Order')
  remove(@Param('id') id: string) {
    const mockUserId = 'USER_ID_HERE'; // thay bằng auth
    return this.ordersService.remove(id, mockUserId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('cancle/:id')
  @ResponseMessage('Cancle Order')
  cancle(@Param('id') id: string, @Req() req) {
    const userId: string = req.user?._id;
    return this.ordersService.cancle(id, userId);
  }
}
