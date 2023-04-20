import '../mongoose_helper';
import { createMocks } from 'node-mocks-http';
import recordApi from '../../pages/api/record';
import { IItem, Item, ItemInput } from '../../server/models/item.model';
import { Category, ICategory } from '../../server/models/category.model';
import { Record } from '../../server/models/record.model';

let category: ICategory;
let item: IItem;

describe('record Api', () => {
  beforeAll(async () => {
    await Item.deleteMany();
    await Category.deleteMany();
    category = await Category.create({ name: 'food' });
    const itemInput: ItemInput = {
      name: 'testing item',
      price: 10,
      cost: 5,
      openToSell: true,
      category: category._id,
    };
    item = await Item.create(itemInput);
  });

  afterEach(async () => {
    await Record.deleteMany();
  });

  describe('POST', () => {
    it('should return a the record and new item with 201 status code', async () => {
      const { req, res } = createMocks({
        method: 'POST',
        body: {
          type: 'sold',
          quantity: 20,
          item: item._id,
        },
      });

      await recordApi(req, res);
      const { data } = JSON.parse(res._getData());

      expect(res._getStatusCode()).toEqual(201);
      expect(data.item._id).toEqual(item._id.toString());
      expect(data.item.records.length).toEqual(1);
      expect(data.record._id).toBeDefined();
    });

    it('should return 400 status code', async () => {
      const { req, res } = createMocks({
        method: 'POST',
        body: {
          type: 'sold',
          quantity: 20,
        },
      });

      await recordApi(req, res);
      const { message } = JSON.parse(res._getData());

      expect(res._getStatusCode()).toEqual(400);
      expect(message).toEqual('all fields must not be empty');
    });
  });

  describe('GET', () => {
    it('should return an empty list of records', async () => {
      const { req, res } = createMocks({
        method: 'GET',
      });

      await recordApi(req, res);
      const data = JSON.parse(res._getData());

      expect(res._getStatusCode()).toEqual(200);
      expect(data.data).toEqual([]);
    });
  });

  describe('other methods', () => {
    it('should throw an error when method does not exist', async () => {
      const { req, res } = createMocks({
        method: 'PATCH',
      });

      await recordApi(req, res);
      const data = JSON.parse(res._getData());

      expect(res._getStatusCode()).toBe(404);
      expect(data.message).toEqual('Invalid method: does not exist');
    });
  });
});
