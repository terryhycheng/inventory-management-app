import mongoose from 'mongoose';

export interface ItemInput {
  name: string;
  price: number;
  cost: number;
  openToSell: boolean;
  category?: string;
}

export interface IItem extends ItemInput, mongoose.Document {}

const ItemSchema = new mongoose.Schema<IItem>({
  name: { type: String, require: true },
  price: { type: Number, require: true },
  cost: { type: Number, require: true },
  openToSell: { type: Boolean, require: true },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    require: true,
  },
});

export const Item =
  (mongoose.models.Item as mongoose.Model<IItem>) ||
  mongoose.model('Item', ItemSchema);
