import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './modules/products/products.module';
// import { UsersModule } from './users/users.module';
import { AuthModule } from './modules/auth/auth.module';
// import { UsersModule } from './modules/users/users.module';

const mongoUri =
  'mongodb+srv://user:password123!@cluster1.btjsk.mongodb.net/auctions_db?retryWrites=true&w=majority';

@Module({
  imports: [
    MongooseModule.forRoot(mongoUri, { useNewUrlParser: true }),
    ProductsModule,
    AuthModule,
    // UsersModule,
    // UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
