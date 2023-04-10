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

  describe('#findCategoryByName', () => {
    beforeAll(async () => {
      await Category.deleteMany();
      const input: CategoryInput = {
        name: 'food',
      };
      await categoryController.addCategory(input);
    });

    it('should return the correct category', async () => {
      const category = await categoryController.findCategoryByName('food');
      expect(category!._id).toBeDefined();
      expect(category!.name).toEqual('food');
    });

    it('should return null', async () => {
      const category = await categoryController.findCategoryByName(
        'wrong name'
      );
      expect(category).toBe(null);
    });
  });

  describe('#getAllCategories', () => {
    beforeEach(async () => await Category.deleteMany());
    it('should return a list of categories', async () => {
      await categoryController.addCategory({ name: 'type a' });
      await categoryController.addCategory({ name: 'type b' });
      const categories = await categoryController.getAllCategories();
      expect(categories.length).toEqual(2);
    });
  });
});
