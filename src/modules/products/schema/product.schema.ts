import * as mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: String,
  description: String,
  category: String,
  minimumBid: Number,
  currentBid: Number,
  lastAutoBidder: String,
  owner: String, //userId
  bidCount: Number,
  availableUntil: String, // TimeStamp (Date & Time)
  imageId: String, // 1,2,3,4
  autoBidSubscribers: [String], // userIds array
});

export { ProductSchema };
