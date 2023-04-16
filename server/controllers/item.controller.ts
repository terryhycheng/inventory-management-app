import { Item, ItemInput } from '../models/item.model';
import { Record } from '../models/record.model';

export const itemController = {
  getAllItems: async () => {
    try {
      const items = await Item.find()
        .populate([{ path: 'records', model: Record }, { path: 'category' }])
        .sort({ name: 'asc' });
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
  findItemById: async (id: string) => {
    try {
      const item = await Item.findOne({ _id: id });
      return item || null;
    } catch (error) {
      throw new Error(`Error from #findItemById: ${(error as Error).message}`);
    }
  },
  addRecord: async (id: string, recordId: string) => {
    try {
      const item = await Item.findOneAndUpdate(
        { _id: id },
        {
          $push: { records: recordId },
        },
        {
          new: true,
        }
      );
      return item;
    } catch (error) {
      throw new Error(`Error from #findItemById: ${(error as Error).message}`);
    }
  },
};
