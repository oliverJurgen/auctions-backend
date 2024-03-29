import { Injectable, HttpException } from '@nestjs/common';
import { Model } from 'mongoose';
import { isNil, omitBy } from 'lodash';
import coercedGet from 'src/utils/coercedGet';
import { Product } from './interfaces/product.interface';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateCurentBidDto } from './dto/update-current-bid.dto';
import { FindAllDto } from './dto/find-all.dto';
import { SuccessDto } from './dto/success-dto';
import { Users, UserType } from '../users/constants/users';
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

  async findAll(findAllDto?: FindAllDto): Promise<Array<Product>> {
    if (findAllDto) {
      const { filter } = findAllDto;
      const category = coercedGet(filter, 'category.in', null);
      const minimumBid = coercedGet(filter, 'minimumBid', null) && {
        $gt: filter?.minimumBid,
      };

      const sort = coercedGet(filter, 'sort', null);

      const procFilter = omitBy({ ...filter, category, minimumBid }, isNil);
      const products = sort
        ? await this.productModel.find(procFilter).exec()
        : await this.productModel.find(procFilter).sort({ sort: 1 }).exec();

      return products;
    }
    const products = await this.productModel.find().exec();

    return products;
  }

  async findOne(id: string) {
    const product = await this.productModel.findById(id).exec();
    if (product) return product;

    throw new HttpException('Product Not Found', 400);
  }

  async updateAutoBid(userId: string, productId: string) {
    const currUser: UserType = Object.values(Users).filter(
      (item) => item.userId === userId,
    )[0] as any;

    const product = await this.productModel.findById(productId).exec();
    // console.log({ productId, product });

    const { lastAutoBidder, bidCount, currentBid, autoBidSubscribers, _id } =
      product;
    if (currUser) {
      const newBidCount = bidCount + 1;
      const newCurrentBid = currentBid + 1;
      const newBidder = userId;
      // ===============

      const { bidData } = currUser;
      const { currentAutoBidSum, maximumBidAmount } = bidData;
      if (maximumBidAmount >= currentAutoBidSum) {
        // Update Previous Bidders bid Data ====
        // Subtract currentBid from last Bidders curretAutoBidSum
        const previousUser: UserType = Object.values(Users).filter(
          (item) => item.userId === lastAutoBidder,
        )[0] as any;

        if (previousUser) {
          const prevUsersToken = previousUser.auth.token;
          const prevUserCurrentAutoBidSum =
            previousUser.bidData.currentAutoBidSum;
          const prevUserNewBidData = {
            ...previousUser.bidData,
            currentAutoBidSum: prevUserCurrentAutoBidSum - currentBid,
          };
          //mutate mock Users DB *** Previous User
          Users[prevUsersToken].bidData = prevUserNewBidData;
        }

        // Update Current Users bid Data ====
        // Add newCurrentBid to Current Bidders currentAutoBidSum
        const currUserToken = currUser.auth.token;
        const newBidData = {
          ...bidData,
          currentAutoBidSum: currentAutoBidSum + newCurrentBid,
        };
        //mutate mock Users DB *** Current User
        Users[currUserToken].bidData = newBidData;

        // Update Product Data in DB
        const newProd = this.productModel
          .findByIdAndUpdate(_id, {
            bidCount: newBidCount,
            currentBid: newCurrentBid,
            lastAutoBidder: newBidder,
          })
          .exec();

        return newProd;
      }
      // unsubscribe user when currentAutoBidSum exceeds or is equal to maximumBidAmount
      const newSubscribers: Array<string> = autoBidSubscribers.filter(
        (item) => item !== userId,
      );
      const newProd = this.productModel
        .findByIdAndUpdate(_id, {
          autoBidSubscribers: newSubscribers,
        })
        .exec();

      return newProd;

      // ===========
    }
  }

  async loopAutoBidSubscribers(userId: string, productId: string) {
    const product = await this.productModel.findById(productId).exec();
    const { autoBidSubscribers } = product;
    const autoBidBasis = [...autoBidSubscribers];
    let index = 0;

    const asyncCalls = [];

    while (index < autoBidBasis.length) {
      const currUserId = autoBidBasis[index];
      index++;
      console.log({ currUserId, index });

      asyncCalls.push(this.updateAutoBid(currUserId, productId));

      if (autoBidBasis.length === index) {
        const result = await Promise.all(asyncCalls);
        if (result.length) {
          const newProduct = result[result.length - 1];

          const { autoBidSubscribers: newAutoBidSubscribers } = newProduct;
          console.log({ newAutoBidSubscribers });
          // index = 0;
        }
      }
    }
  }

  async updateCurrentBid(
    id: string,
    update: UpdateCurentBidDto,
    // userId: string,
  ): Promise<SuccessDto | string> {
    // console.log({ userId });

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
      // console.log({ newCurrentBid, currentBid, minimumBid });
      if (isValidBid && isAvailable) {
        // console.log({ isValidBid });
        const newBidCount = bidCount + 1;
        const newProduct = await this.productModel
          .findByIdAndUpdate(id, {
            bidCount: newBidCount,
            currentBid: newCurrentBid,
          })
          .exec();

        // AUTO BID IMP HERE - DDNT FINISH AUTO BID
        // const { autoBidSubscribers, _id } = newProduct;
        // if (autoBidSubscribers.length) {
        //   await this.loopAutoBidSubscribers(userId, _id);
        // }

        if (newProduct) {
          return {
            success: true,
          };
        }
      }
      if (currentDateTime >= availableUntil) {
        throw new HttpException('Item availability expired.', 400);
      }
      throw new HttpException('Invalid Bid Amount', 400);
    }

    throw new HttpException('Product Not Found', 400);
  }
}
