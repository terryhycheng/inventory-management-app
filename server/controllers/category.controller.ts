import { Category, CategoryInput } from '../models/category.model';

export const categoryController = {
  addCategory: async (input: CategoryInput) => {
    const category = await Category.create(input);
    return category;
  },
};
