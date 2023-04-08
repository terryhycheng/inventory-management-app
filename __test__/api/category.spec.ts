import '../mongoose_helper';
import { createMocks } from 'node-mocks-http';
import categoryApi from '../../pages/api/category';
import { Category } from '../../server/models/category.model';

describe('Category API', () => {
  beforeAll(() => Category.deleteMany());

  afterEach(() => Category.deleteMany());

  it('should return a new category', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        name: 'testing',
      },
    });

    await categoryApi(req, res);

    expect(res._getStatusCode()).toBe(201);
    expect(JSON.parse(res._getData())._id).toBeDefined();
    expect(JSON.parse(res._getData()).name).toEqual('testing');
  });
});
