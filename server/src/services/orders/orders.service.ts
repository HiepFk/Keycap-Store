import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order, OrderDocument } from './schemas/order.schemas';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name)
    private readonly orderModel: Model<OrderDocument>,
  ) {}

  async create(createOrderDto: CreateOrderDto, userId: string) {
    const totalProductsPrice = createOrderDto.products.reduce(
      (sum, item) => sum + item.totalPrice,
      0,
    );

    const totalAmount = totalProductsPrice + createOrderDto.shippingFee;

    const order = new this.orderModel({
      ...createOrderDto,
      createdBy: userId,
      totalAmount,
      status: 'pending',
      statusHistory: [
        {
          status: 'pending',
          at: new Date(),
        },
      ],
    });

    return order.save();
  }

  async findAll() {
    return this.orderModel
      .find({ isDeleted: false })
      .sort({ createdAt: -1 })
      .exec();
  }

  async findOne(id: string) {
    const order = await this.orderModel
      .findOne({ _id: id, isDeleted: false })
      .populate('createdBy', 'email name')
      .populate('products.productId', 'header src price category')
      .exec();

    if (!order) {
      throw new NotFoundException('Không tìm thấy đơn hàng');
    }

    return order;
  }

  async remove(id: string, userId: string) {
    const order = await this.orderModel.findById(id);

    if (!order || order.isDeleted) {
      throw new NotFoundException('Không tìm thấy đơn hàng');
    }

    return order.save();
  }
}
