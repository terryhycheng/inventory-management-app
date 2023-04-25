import '../../mongoose_helper';
import { createMocks } from 'node-mocks-http';
import { Item, ItemInput } from '../../../server/models/item.model';
import { Category, ICategory } from '../../../server/models/category.model';
import itemApi from '../../../pages/api/item';

let category: ICategory;

describe('item Api', () => {
  beforeAll(async () => {
    await Category.deleteMany();
    await Item.deleteMany();
    category = await Category.create({ name: 'food' });
  });

  afterEach(async () => {
    await Item.deleteMany();
  });

  describe('GET route', () => {
    it('should return a list of items with 200 status code', async () => {
      // SETUP
      const input: ItemInput = {
        name: 'testing item',
        price: 20,
        cost: 10,
        openToSell: false,
        category: 'food',
      };

      const postMock = createMocks({
        method: 'POST',
        body: input,
      });

      const getMock = createMocks({
        method: 'GET',
      });

      // ACTION
      await itemApi(postMock.req, postMock.res);
      await itemApi(getMock.req, getMock.res);
      const data = JSON.parse(getMock.res._getData());

      // ASSERT
      expect(getMock.res._getStatusCode()).toBe(200);
      expect(data.data.length).toEqual(1);
    });
  });

  describe('POST route', () => {
    it('should return a new item with 201 status code', async () => {
      const input: ItemInput = {
        name: 'testing item',
        price: 20,
        cost: 10,
        openToSell: false,
        category: 'food',
      };

      const { req, res } = createMocks({
        method: 'POST',
        body: input,
      });

      await itemApi(req, res);
      const data = JSON.parse(res._getData());

      expect(res._getStatusCode()).toBe(201);
      expect(data.data._id).toBeDefined();
      expect(data.data.name).toEqual('testing item');
      expect(data.data.category).toEqual(category!._id.toString());
    });

    it('should return 400 status code when the category does not exist', async () => {
      const { req, res } = createMocks({
        method: 'POST',
        body: {
          name: 'testing item',
          price: 20,
          cost: 10,
          openToSell: true,
          category: 'wrong category',
        },
      });

      await itemApi(req, res);
      const data = JSON.parse(res._getData());

      expect(res._getStatusCode()).toBe(400);
      expect(data.message).toEqual('category does not exist');
    });
  });
});
