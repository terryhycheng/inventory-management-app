import { Item, ItemInput } from '../models/item.model';

export const itemController = {
  getAllItems: async () => {
    try {
      const items = await Item.find();
      return items;
    } catch (error) {
      throw new Error(`Error from #getAllItems: ${(error as Error).message}`);
    }
  },
  addItem: async (input: ItemInput) => {
    try {
      const item = await Item.create(input);
      return item;
    } catch (error) {
      throw new Error(`Error from #addItem: ${(error as Error).message}`);
    }
  },
};
