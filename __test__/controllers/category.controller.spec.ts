import '../mongoose_helper';
import { Category, CategoryInput } from '../../server/models/category.model';
import { categoryController } from '../../server/controllers/category.controller';

describe('category controller', () => {
  beforeAll(async () => await Category.deleteMany());

  describe('#addCategory', () => {
    beforeEach(async () => await Category.deleteMany());
    it('should create a new category', async () => {
      const input: CategoryInput = {
        name: 'food',
      };
      const record = await categoryController.addCategory(input);
      expect(record._id).toBeDefined();
      expect(record.name).toEqual('food');
    });
  });

  describe('#findByName', () => {
    beforeAll(async () => {
      await Category.deleteMany();
      const input: CategoryInput = {
        name: 'food',
      };
      await categoryController.addCategory(input);
    });

    it('should return the correct category', async () => {
      const category = await categoryController.findByName('food');
      expect(category!._id).toBeDefined();
      expect(category!.name).toEqual('food');
    });

    it('should return null', async () => {
      const category = await categoryController.findByName('wrong name');
      expect(category).toBe(null);
    });
  });
});
