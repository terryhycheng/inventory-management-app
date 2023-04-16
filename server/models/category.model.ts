import mongoose from 'mongoose';

export interface CategoryInput {
  name: string;
}

export interface ICategory extends CategoryInput, mongoose.Document {}

const CategorySchema = new mongoose.Schema<ICategory>({
  name: { type: String, require: true },
});

export const Category =
  (mongoose.models.category as mongoose.Model<ICategory>) ||
  mongoose.model('category', CategorySchema);
