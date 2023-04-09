import { Item, ItemInput } from '../models/item.model';

export const itemController = {
  addItem: async (input: ItemInput) => {
    try {
      const item = await Item.create(input);
      return item;
    } catch (error) {
      throw new Error(`Error from #addItem: ${(error as Error).message}`);
    }
  },
};
