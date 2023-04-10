import { Record, RecordInput } from '../models/record.model';

export const recordController = {
  getAllRecords: async () => {
    try {
      const records = await Record.find();
      return records;
    } catch (error) {
      throw new Error(`Error from #getAllRecords: ${(error as Error).message}`);
    }
  },
  addRecord: async (input: RecordInput) => {
    try {
      const record = await Record.create(input);
      return record;
    } catch (error) {
      throw new Error(`Error from #addRecord: ${(error as Error).message}`);
    }
  },
};
