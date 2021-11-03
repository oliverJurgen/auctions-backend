import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './modules/products/products.module';
import { AuthModule } from './modules/auth/auth.module';

import { UserModule } from './modules/user/user.module';

const mongoUri =
  'mongodb+srv://user:password123!@cluster1.btjsk.mongodb.net/auctions_db?retryWrites=true&w=majority';

@Module({
  imports: [
    MongooseModule.forRoot(mongoUri, { useNewUrlParser: true }),
    ProductsModule,
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
