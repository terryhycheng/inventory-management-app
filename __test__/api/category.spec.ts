import '../mongoose_helper';
import { createMocks } from 'node-mocks-http';
import categoryApi from '../../pages/api/category';
import { Category } from '../../server/models/category.model';

describe('Category API', () => {
  beforeAll(() => Category.deleteMany());

  afterEach(() => Category.deleteMany());

  it('should return a new category with status code 201', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        name: 'testing',
      },
    });

    await categoryApi(req, res);
    const data = JSON.parse(res._getData());

    expect(res._getStatusCode()).toBe(201);
    expect(data._id).toBeDefined();
    expect(data.name).toEqual('testing');
  });

  it('should throw an error with status code 500', async () => {
    const { req, res } = createMocks({
      method: 'POST',
    });

    await categoryApi(req, res);
    const data = JSON.parse(res._getData());

    expect(res._getStatusCode()).toBe(400);
    expect(data.message).toEqual('`name` is required');
  });
});
