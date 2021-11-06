import { IsOptional } from 'class-validator';

export class FindAllDto {
  @IsOptional()
  filter: {
    bidCount?: number;
    minimumBid?: number;
    category?: {
      in: string[];
    };
  };
}
