import mongoose from 'mongoose';

export interface CategoryInput {
  name: string;
}

export interface ICategory extends CategoryInput, mongoose.Document {}

const CategorySchema = new mongoose.Schema<ICategory>({
  name: { type: String, require: true },
});

export const Category =
  (mongoose.models.Category as mongoose.Model<ICategory>) ||
  mongoose.model('Category', CategorySchema);
