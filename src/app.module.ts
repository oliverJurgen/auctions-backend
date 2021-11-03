import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';

const mongoUri =
  'mongodb+srv://user:password123!@cluster1.btjsk.mongodb.net/auctions_db?retryWrites=true&w=majority';

@Module({
  imports: [MongooseModule.forRoot(mongoUri, { useNewUrlParser: true })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
