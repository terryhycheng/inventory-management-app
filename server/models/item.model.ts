import mongoose from 'mongoose';

interface IItem extends Document {
  name: string;
  price: number;
  cost: number;
  openToSell: boolean;
  category?: string;
}

const ItemSchema = new mongoose.Schema({
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

export const Item = mongoose.model<IItem>('Item', ItemSchema);
