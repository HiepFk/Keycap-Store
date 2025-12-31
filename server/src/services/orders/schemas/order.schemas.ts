import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export enum OrderStatus {
  PENDING = 'pending', // đang đợi
  CONFIRMED = 'confirmed', // xác thực
  SHIPPING = 'shipping', // bắt đầu ship
  DELIVERED = 'delivered', // đã giao
  CANCELLED = 'cancelled', // huỷ
}

@Schema({ _id: false })
export class OrderProduct {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  })
  productId: mongoose.Types.ObjectId;

  @Prop({ required: true, min: 1 })
  quantity: number;

  @Prop({ required: true, min: 0 })
  totalPrice: number;
}

export const OrderProductSchema = SchemaFactory.createForClass(OrderProduct);

@Schema({ _id: false })
export class OrderStatusHistory {
  @Prop({ enum: Object.values(OrderStatus), required: true })
  status: OrderStatus;

  @Prop({ default: Date.now })
  at: Date;
}

export const OrderStatusHistorySchema =
  SchemaFactory.createForClass(OrderStatusHistory);

export type OrderDocument = HydratedDocument<Order>;

@Schema({ timestamps: true })
export class Order {
  @Prop({ unique: true })
  orderCode: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  createdBy: mongoose.Types.ObjectId;

  @Prop({ type: [OrderProductSchema], required: true })
  products: OrderProduct[];

  @Prop({
    enum: Object.values(OrderStatus),
    default: OrderStatus.PENDING,
  })
  status: OrderStatus;

  @Prop({ type: [OrderStatusHistorySchema], default: [] })
  statusHistory: OrderStatusHistory[];

  @Prop({ required: true, min: 0 })
  shippingFee: number;

  @Prop({ required: true, min: 0 })
  totalAmount: number;

  @Prop({ required: true })
  receiverName: string;

  @Prop({ required: true })
  receiverPhone: string;

  @Prop({ required: true })
  receiverAddress: string;

  @Prop({
    required: true,
    enum: ['cod', 'banking', 'momo', 'vnpay'],
  })
  paymentMethod: string;

  @Prop({ default: false })
  isPaid: boolean;

  @Prop()
  paidAt?: Date;

  @Prop()
  note?: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  updatedBy?: mongoose.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  deletedBy?: mongoose.Types.ObjectId;

  @Prop({ default: false })
  isDeleted: boolean;

  @Prop()
  deletedAt?: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);

OrderSchema.index({ orderCode: 1 });
OrderSchema.index({ createdBy: 1 });
OrderSchema.index({ status: 1 });
OrderSchema.index({ isDeleted: 1 });
