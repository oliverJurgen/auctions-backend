export class CreateProductDto {
  readonly name: string;
  readonly description: string;
  readonly price: number;
  readonly minimumBid: number;
  readonly currentBid: number;
  readonly owned: boolean;
}
