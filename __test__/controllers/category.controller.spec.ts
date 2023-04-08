import '../mongoose_helper';
import { Category } from '../../server/models/category.model';
import { categoryController } from '../../server/controllers/category.controller';

describe('category controller', () => {
  beforeAll(() => Category.deleteMany());

  afterEach(() => Category.deleteMany());

  describe('#addCategory', () => {
    it('should create a new category', async () => {
      const category = {
        name: 'food',
      };
      const record = await categoryController.addCategory(category);
      expect(record._id).toBeDefined();
      expect(record.name).toEqual('food');
    });
  });
});
