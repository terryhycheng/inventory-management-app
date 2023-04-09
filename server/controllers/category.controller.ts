import { Category, CategoryInput } from '../models/category.model';

export const categoryController = {
  addCategory: async (input: CategoryInput) => {
    try {
      const category = await Category.create(input);
      return category;
    } catch (error) {
      throw new Error(`Error from #addCategory: ${(error as Error).message}`);
    }
  },

  findByName: async (name: string) => {
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
