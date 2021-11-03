import { Document } from 'mongoose';

export interface Product extends Document {
  readonly name: string;
  readonly description: string;
  readonly category: string;
  readonly minimumBid: number;
  readonly currentBid: number;
  readonly lastBidder: string;
  readonly owner: string;
  readonly availableUntil: string;
  readonly imageId: string;
}
