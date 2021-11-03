import { Document } from 'mongoose';

export interface Product extends Document {
  readonly name: string;
  readonly description: string;
  readonly price: number;
  readonly minimumBid: number;
  readonly currentBid: number;
  readonly owned: boolean;
}
