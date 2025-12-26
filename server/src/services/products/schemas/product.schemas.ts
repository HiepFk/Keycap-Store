import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema({ timestamps: true })
export class Product {
  // Images
  @Prop({ required: true })
  src: string;

  @Prop()
  topSrc?: string;

  @Prop()
  botSrc?: string;

  @Prop()
  rightSrc?: string;

  // Status
  @Prop({ default: false })
  nu: boolean; // new product

  // Content
  @Prop({ required: true })
  header: string;

  @Prop({ required: true })
  subheader: string;

  @Prop({ required: true })
  text: string;

  @Prop({ type: String })
  features: string;

  @Prop({
    type: [
      {
        count: { type: Number, required: true },
        content: { type: String, required: true },
      },
    ],
    default: [],
  })
  inthebox: {
    count: number;
    content: string;
  }[];

  @Prop({ required: true, min: 0 })
  price: number;

  @Prop({
    required: true,
    enum: ['keyboards', 'keycaps', 'deskmats'],
  })
  category: 'keyboards' | 'keycaps' | 'deskmats';

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  createdBy: mongoose.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  updatedBy: mongoose.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  deletedBy: mongoose.Types.ObjectId;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop()
  isDeleted: boolean;

  @Prop()
  deletedAt: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
