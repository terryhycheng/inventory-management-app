import '../mongoose_helper';
import { Category, CategoryInput } from '../../server/models/category.model';
import { categoryController } from '../../server/controllers/category.controller';

describe('category controller', () => {
  beforeAll(async () => await Category.deleteMany());

  afterEach(async () => await Category.deleteMany());

  describe('#addCategory', () => {
    it('should create a new category', async () => {
      const category: CategoryInput = {
        name: 'food',
      };
      const record = await categoryController.addCategory(category);
      expect(record._id).toBeDefined();
      expect(record.name).toEqual('food');
    });
  });
});
