import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, SortOrder } from 'mongoose';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order, OrderDocument } from './schemas/order.schemas';
import aqp from 'api-query-params';

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

  async findAll(
    currentPage: number,
    limit: number,
    search: string,
    query: Record<string, any>,
  ) {
    const { filter, sort, projection, population } = aqp(query);

    const page = currentPage > 0 ? currentPage : 1;
    const pageSize = 200;
    const skip = (page - 1) * pageSize;

    const mongoFilter: any = { ...filter };

    const populates: any[] = [
      {
        path: 'products.productId',
        select: 'header src subheader category price',
      },
    ];

    if (population) {
      if (Array.isArray(population)) {
        populates.push(...population);
      } else {
        populates.push(population);
      }
    }

    const trimmedSearch = search?.trim();
    if (trimmedSearch) {
      mongoFilter.$and = [
        ...(mongoFilter.$and || []),
        {
          $or: [{ orderCode: { $regex: trimmedSearch, $options: 'i' } }],
        },
      ];
    }

    if (mongoFilter.isDeleted === undefined) {
      mongoFilter.isDeleted = { $ne: true };
    }

    const mongooseSort = sort as Record<string, any>;

    const [total, orders] = await Promise.all([
      this.orderModel.countDocuments(mongoFilter),
      this.orderModel
        .find(mongoFilter, projection)
        .skip(skip)
        .limit(pageSize)
        .sort(mongooseSort)
        .populate(populates)
        .lean() // ⚠️ rất quan trọng để map dễ
        .exec(),
    ]);

    const data = orders.map((order) => ({
      ...order,
      products: order.products.map((item) => {
        const product = item.productId as any; // 👈 ép kiểu tại đây

        return {
          _id: product?._id,
          src: product?.src,
          header: product?.header,
          subheader: product?.subheader,
          price: product?.price,
          category: product?.category,
          quantity: item?.quantity,
        };
      }),
    }));

    return {
      meta: {
        current: page,
        pageSize,
        total,
        pages: Math.ceil(total / pageSize),
      },
      data,
    };
  }

  async findOne(id: string) {
    const order = await this.orderModel
      .findOne({ orderCode: id, isDeleted: false })
      .populate('createdBy', 'email name')
      .populate({
        path: 'products.productId',
        select: 'header src subheader category',
      })
      .lean()
      .exec();

    if (!order) {
      throw new NotFoundException('Không tìm thấy đơn hàng');
    }

    const mappedOrder = {
      ...order,
      products: order.products.map((item) => {
        const product = item.productId as any;

        return {
          _id: product?._id,
          header: product?.header,
          subheader: product?.subheader,
          src: product?.src,
          price: product?.price || item.totalPrice / item?.quantity,
          category: product?.category,
          quantity: item.quantity,
          totalPrice: item.totalPrice,
        };
      }),
    };

    return mappedOrder;
  }

  async remove(id: string, userId: string) {
    const order = await this.orderModel.findById(id);

    if (!order || order.isDeleted) {
      throw new NotFoundException('Không tìm thấy đơn hàng');
    }

    return order.save();
  }
}
