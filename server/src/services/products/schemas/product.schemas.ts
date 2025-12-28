import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export enum ProductCategory {
  KEYBOARDS = 'keyboards',
  KEYCAPS = 'keycaps',
  DESKMATS = 'deskmats',
}

@Schema({ _id: false })
export class InTheBoxItem {
  @Prop({ required: true, min: 1 })
  count: number;

  @Prop({ required: true })
  content: string;
}

export const InTheBoxItemSchema = SchemaFactory.createForClass(InTheBoxItem);

export type ProductDocument = HydratedDocument<Product>;

@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true })
  src: string;

  @Prop()
  topSrc?: string;

  @Prop()
  botSrc?: string;

  @Prop()
  rightSrc?: string;

  /* ---------- Status ---------- */
  @Prop({ default: false })
  isNew: boolean;

  /* ---------- Content ---------- */
  @Prop({ required: true })
  header: string;

  @Prop({ required: true })
  subheader: string;

  @Prop({ required: true })
  text: string;

  @Prop({ type: [String], default: [] })
  features: string[];

  @Prop({
    type: [InTheBoxItemSchema],
    default: [],
  })
  inthebox: InTheBoxItem[];

  /* ---------- Pricing ---------- */
  @Prop({ required: true, min: 0 })
  price: number;

  @Prop({
    required: true,
    enum: Object.values(ProductCategory),
  })
  category: ProductCategory;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  createdBy: mongoose.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  updatedBy: mongoose.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  deletedBy: mongoose.Types.ObjectId;

  @Prop({ default: false })
  isDeleted: boolean;

  @Prop()
  deletedAt: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
