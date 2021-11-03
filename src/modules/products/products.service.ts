import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Product } from './interfaces/product.interface';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateCurentBidDto } from './dto/update-current-bid.dto';
import { SuccessDto } from './dto/success-dto';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const newProduct = await this.productModel.create(createProductDto);
    return newProduct;
  }

  async findAll(): Promise<Array<Product>> {
    const products = await this.productModel.find().exec();
    return products;
  }

  async findOne(id: string) {
    const product = await this.productModel.findById(id).exec();
    if (product) return product;

    return 'Product Not Found';
  }

  async updateCurrentBid(
    id: string,
    update: UpdateCurentBidDto,
  ): Promise<SuccessDto | string> {
    const product = (await this.productModel.findById(id).exec()) as any;
    if (product) {
      const { bidCount, currentBid, availableUntil, minimumBid } = product;
      const { currentBid: newCurrentBid } = update;

      const currentDateTime = new Date().getTime() / 1000;
      const isValidBid =
        newCurrentBid > currentBid && newCurrentBid > minimumBid;
      const isAvailable = currentDateTime < availableUntil;

      // validations:
      // Check if new bid exceeds previous bid
      // Check if current dateTime exceeds availability expiration
      if (isValidBid && isAvailable) {
        const newBidCount = bidCount + 1;
        const newProduct = await this.productModel
          .findByIdAndUpdate(id, {
            bidCount: newBidCount,
            currentBid: newCurrentBid,
          })
          .exec();

        if (newProduct) {
          return {
            success: true,
          };
        }
      }
      if (currentDateTime >= availableUntil) {
        return 'Item availability expired.';
      }
      return 'Invalid Bid Amount';
    }

    return 'Product Not Found';
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
