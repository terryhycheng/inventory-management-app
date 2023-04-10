import { Category, CategoryInput } from '../models/category.model';

export const categoryController = {
  getAllCategories: async () => {
    try {
      const categories = await Category.find();
      return categories;
    } catch (error) {
      throw new Error(
        `Error from #getAllCategories: ${(error as Error).message}`
      );
    }
  },
  addCategory: async (input: CategoryInput) => {
    try {
      const category = await Category.create(input);
      return category;
    } catch (error) {
      throw new Error(`Error from #addCategory: ${(error as Error).message}`);
    }
  },

  findCategoryByName: async (name: string) => {
    try {
      const category = await Category.findOne({ name }).exec();
      return category || null;
    } catch (error) {
      throw new Error(
        `Error from #findCategoryByName: ${(error as Error).message}`
      );
    }
  },
};
