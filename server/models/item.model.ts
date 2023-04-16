import mongoose from 'mongoose';

export interface ItemInput {
  name: string;
  price: number;
  cost: number;
  openToSell: boolean;
  category?: string;
  records?: string[];
}

export interface IItem extends ItemInput, mongoose.Document {}

const ItemSchema = new mongoose.Schema<IItem>({
  name: { type: String, require: true },
  price: { type: Number, require: true },
  cost: { type: Number, require: true },
  openToSell: { type: Boolean, require: true },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'category',
    require: true,
  },
  records: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'record',
    },
  ],
});

export const Item =
  (mongoose.models.item as mongoose.Model<IItem>) ||
  mongoose.model('item', ItemSchema);
