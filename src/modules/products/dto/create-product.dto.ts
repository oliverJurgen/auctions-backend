export class CreateProductDto {
  readonly name: string;
  readonly description: string;
  readonly category: string;
  readonly minimumBid: number;
  readonly currentBid: number;
  readonly owner: string;
  readonly bidCount: number;
  readonly availableUntil: string;
  readonly imageId: string;
}
