import '../mongoose_helper';
import { itemController } from '../../server/controllers/item.controller';
import { Category, ICategory } from '../../server/models/category.model';
import { IItem, Item, ItemInput } from '../../server/models/item.model';
import { IRecord, Record } from '../../server/models/record.model';

let category: ICategory | null;

describe('item controller', () => {
  beforeAll(async () => {
    await Category.deleteMany();
    await Item.deleteMany();
    category = await Category.create({ name: 'food' });
  });

  afterEach(async () => {
    await Item.deleteMany();
  });

  describe('#addItem', () => {
    it('should create a new item', async () => {
      const input: ItemInput = {
        name: 'test item',
        price: 100,
        cost: 50,
        openToSell: true,
        category: category!._id,
      };

      const item = await itemController.addItem(input);
      expect(item._id).toBeDefined();
      expect(item.name).toEqual('test item');
      expect(item.price).toEqual(100);
      expect(item.cost).toEqual(50);
      expect(item.openToSell).toEqual(true);
      expect(item.category).toEqual(category!._id);
    });
  });

  describe('#getAllItems', () => {
    it('should return a list of items', async () => {
      // SETUP
      const inputA: ItemInput = {
        name: 'testing 1',
        price: 20,
        cost: 10,
        openToSell: false,
      };

      const inputB: ItemInput = {
        name: 'testing 2',
        price: 50,
        cost: 25,
        openToSell: true,
      };
      await itemController.addItem(inputA);
      await itemController.addItem(inputB);

      // ACTION
      const items = await itemController.getAllItems();

      // ASSERT
      expect(items.length).toEqual(2);
      expect(items[0]?.name).toEqual('testing 1');
      expect(items[1]?.cost).toEqual(25);
    });
  });

  describe('#findItemById', () => {
    it('should return an item with the specific id', async () => {
      // SETUP
      const input: ItemInput = {
        name: 'item A',
        price: 20,
        cost: 10,
        openToSell: false,
      };

      // ACTION
      const newItem = await itemController.addItem(input);
      const itemFound = await itemController.findItemById(newItem._id);

      // ASSERT
      expect(itemFound?._id).toEqual(newItem._id);
    });

    it('should return null when id does not exist', async () => {
      const res = await itemController.findItemById('643489d093f93adef086008f');
      expect(res).toBe(null);
    });
  });

  describe('#addRecord', () => {
    let record: IRecord;
    let item: IItem;

    beforeAll(async () => {
      await Record.deleteMany();
      const input: ItemInput = {
        name: 'test item',
        price: 100,
        cost: 50,
        openToSell: true,
        category: category!._id,
      };

      item = await itemController.addItem(input);
      record = await Record.create({
        type: 'sale',
        quantity: 20,
        item: item._id,
      });
    });

    beforeAll(async () => {
      await Record.deleteMany();
    });

    it('should return the new item', async () => {
      const newItem = await itemController.addRecord(item._id, record._id);
      expect(newItem?.records?.length).toEqual(1);
    });
  });
});
