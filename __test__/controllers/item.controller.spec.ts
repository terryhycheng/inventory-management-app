import '../mongoose_helper';
import { itemController } from '../../server/controllers/item.controller';
import { Category, ICategory } from '../../server/models/category.model';
import { Item, ItemInput } from '../../server/models/item.model';

let category: ICategory;

describe('item controller', () => {
  beforeAll(async () => {
    await Category.deleteMany();
    await Item.deleteMany();
    category = await Category.create({ name: 'food' });
  });

  afterEach(async () => await Item.deleteMany());

  describe('#addItem', () => {
    it('should create a new item', async () => {
      const input: ItemInput = {
        name: 'test item',
        price: 100,
        cost: 50,
        openToSell: true,
        category: category._id,
      };

      const item = await itemController.addItem(input);
      expect(item._id).toBeDefined();
      expect(item.name).toEqual('test item');
      expect(item.price).toEqual(100);
      expect(item.cost).toEqual(50);
      expect(item.openToSell).toEqual(true);
      expect(item.category).toEqual(category._id);
    });
  });
});
