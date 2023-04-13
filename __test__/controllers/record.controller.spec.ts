import '../mongoose_helper';
import { Record, RecordInput } from '../../server/models/record.model';
import { recordController } from '../../server/controllers/record.controller';
import { type IItem, Item } from '../../server/models/item.model';
import { Category, type ICategory } from '../../server/models/category.model';

describe('record controller', () => {
  let item: IItem;
  let category: ICategory;

  beforeAll(async () => {
    await Item.deleteMany();
    await Category.deleteMany();
    category = await Category.create({
      name: 'test_category',
    });
    item = await Item.create({
      name: 'testing item',
      price: 10,
      cost: 5,
      openToSell: true,
      category: category._id,
    });
  });

  afterEach(async () => await Record.deleteMany());

  describe('#addRecord', () => {
    it('should return a new record', async () => {
      const input: RecordInput = {
        type: 'import',
        quantity: 10,
        item: item._id,
      };
      const record = await recordController.addRecord(input);
      expect(record._id).toBeDefined();
      expect(record.type).toEqual('import');
      expect(record.quantity).toEqual(10);
    });
  });
  describe('#getAllRecords', () => {
    it('should return an empty list', async () => {
      const records = await recordController.getAllRecords();
      expect(records.length).toEqual(0);
    });
    it('should return a list of records', async () => {
      const inputA: RecordInput = {
        type: 'import',
        quantity: 10,
        item: item._id,
      };

      const inputB: RecordInput = {
        type: 'sold',
        quantity: 5,
        item: item._id,
      };
      await recordController.addRecord(inputA);
      await recordController.addRecord(inputB);
      const records = await recordController.getAllRecords();
      expect(records.length).toEqual(2);
      expect(records[0]?.type).toEqual('import');
      expect(records[1]?.quantity).toEqual(5);
    });
  });
});
