export class CreateProductDto {
  readonly name: string;
  readonly description: string;
  readonly category: string;
  readonly minimumBid: number;
  readonly currentBid: number;
  readonly lastAutoBidder: string;
  readonly owner: string;
  readonly bidCount: number;
  readonly availableUntil: string;
  readonly imageId: string;
}
