import * as mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  minimumBid: Number,
  currentBid: Number,
  owned: Boolean,
});

export { ProductSchema };
