import mongoose from 'mongoose';

export interface RecordInput {
  type: 'sold' | 'import';
  quantity: number;
  item?: string;
}

export interface IRecord extends RecordInput, mongoose.Document {}

const RecordSchema = new mongoose.Schema<IRecord>(
  {
    type: { type: String, require: true },
    quantity: { type: Number, required: true },
    item: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'item',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Record =
  (mongoose.models.record as mongoose.Model<IRecord>) ||
  mongoose.model('record', RecordSchema);
