import mongoose from 'mongoose';

export interface RecordInput {
  type: string;
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
      ref: 'Item',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Record =
  (mongoose.models.Record as mongoose.Model<IRecord>) ||
  mongoose.model('Record', RecordSchema);
