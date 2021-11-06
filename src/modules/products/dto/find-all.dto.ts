import { IsOptional } from 'class-validator';

type sortType = 'bidCount' | 'minimumBid' | 'currentBid';

export class FindAllDto {
  filter: {
    sort?: sortType;
    minimumBid?: number;
    category?: {
      in: string[];
    };
  };
}
