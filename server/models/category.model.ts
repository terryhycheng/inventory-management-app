import mongoose from 'mongoose';

export interface CategoryInput {
  name: string;
}

export interface ICategory extends CategoryInput, mongoose.Document {}

const CategorySchema = new mongoose.Schema({
  name: { type: String, require: true },
});

export const Category = mongoose.model<ICategory>('Category', CategorySchema);
