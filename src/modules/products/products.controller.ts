import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateCurentBidDto } from './dto/update-current-bid.dto';
import { FindAllDto } from './dto/find-all.dto';
import { AuthGuard } from '../../guards/auth.guard';
import { RequestDec } from '../../decorators/request.decorator';
import { UserIdPipe } from '../../pipes/user-id.pipe';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('/create')
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    return this.productsService.findAll();
  }

  @Post()
  @UseGuards(AuthGuard)
  findAllWithFilter(@Body() findAllDto: FindAllDto) {
    return this.productsService.findAll(findAllDto);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(
    @Param('id') id: string,
    @Body() updateBid: UpdateCurentBidDto,
    @RequestDec(new UserIdPipe()) userId,
  ) {
    return this.productsService.updateCurrentBid(id, updateBid, userId);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.productsService.remove(+id);
  // }
}
