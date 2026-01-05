import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './schemas/product.schemas';
import mongoose, { Model, SortOrder } from 'mongoose';
import aqp from 'api-query-params';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name)
    private productsModel: Model<ProductDocument>,
  ) {}
  create(createDto: CreateProductDto) {
    return 'This action adds a new product';
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

    const trimmedSearch = search?.trim();
    if (trimmedSearch) {
      mongoFilter.$and = [
        ...(mongoFilter.$and || []),
        {
          $or: [
            { header: { $regex: trimmedSearch, $options: 'i' } },
            { subheader: { $regex: trimmedSearch, $options: 'i' } },
            { text: { $regex: trimmedSearch, $options: 'i' } },
          ],
        },
      ];
    }

    if (mongoFilter.isDeleted === undefined) {
      mongoFilter.isDeleted = { $ne: true };
    }

    const mongooseSort = sort as Record<string, SortOrder>;

    const [total, data] = await Promise.all([
      this.productsModel.countDocuments(mongoFilter),
      this.productsModel
        .find(mongoFilter, projection)
        .skip(skip)
        .limit(pageSize)
        .sort(mongooseSort)
        .populate(population)
        .exec(),
    ]);

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

  async findRandom(limit = 3) {
    return this.productsModel.aggregate([
      {
        $match: {
          isDeleted: { $ne: true },
        },
      },
      {
        $sample: { size: limit },
      },
    ]);
  }

  async findOne(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) return 'not found';
    return await this.productsModel.findById(id);
  }

  update(id: number, updateDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
