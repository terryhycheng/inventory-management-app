import { createMocks } from 'node-mocks-http';
import { connectDB } from '../../util/connectMongo';
import { itemController } from '../../server/controllers/item.controller';
import { categoryController } from '../../server/controllers/category.controller';
import itemApi from '../../pages/api/item';

jest.mock('../../util/connectMongo');
jest.mock('../../server/controllers/item.controller');
jest.mock('../../server/controllers/category.controller');

describe('item api unit tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET route', () => {
    it('should return a list of items with 200 status code', async () => {
      const { req, res } = createMocks({
        method: 'GET',
      });
      const itemsMock = [
        { _id: '1', name: 'item a' },
        { _id: '2', name: 'item b' },
      ];
      (itemController.getAllItems as jest.Mock).mockResolvedValue(itemsMock);

      await itemApi(req, res);
      const data = JSON.parse(res._getData());

      expect(connectDB).toHaveBeenCalled();
      expect(res._getStatusCode()).toBe(200);
      expect(data.data).toEqual(itemsMock);
    });

    it('should return an error message when something goes wrong', async () => {
      const { req, res } = createMocks({
        method: 'GET',
      });
      const error = new Error('something went wrong');
      (itemController.getAllItems as jest.Mock).mockRejectedValue(error);

      await itemApi(req, res);
      const data = JSON.parse(res._getData());

      expect(connectDB).toHaveBeenCalled();
      expect(res._getStatusCode()).toBe(500);
      expect(data.message).toEqual('failed to get items: something went wrong');
    });
  });

  describe('POST route', () => {
    it('should return a new item with 201 status code', async () => {
      const inputMock = {
        name: 'item a',
        price: 10,
        cost: 5,
        openToSell: true,
        category: 'sold',
      };
      const itemMock = { _id: '1', name: 'item a' };
      const { req, res } = createMocks({
        method: 'POST',
        body: inputMock,
      });
      (categoryController.findCategoryByName as jest.Mock).mockResolvedValue({
        _id: '1',
      });
      (itemController.addItem as jest.Mock).mockResolvedValue(itemMock);

      await itemApi(req, res);
      const data = JSON.parse(res._getData());

      expect(connectDB).toHaveBeenCalled();
      expect(res._getStatusCode()).toEqual(201);
      expect(categoryController.findCategoryByName).toBeCalledWith('sold');
      expect(data.data).toEqual(itemMock);
      expect(itemController.addItem).toHaveBeenCalledWith({
        ...inputMock,
        category: '1',
      });
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

      (categoryController.findCategoryByName as jest.Mock).mockResolvedValue(
        null
      );

      await itemApi(req, res);
      const data = JSON.parse(res._getData());

      expect(res._getStatusCode()).toBe(400);
      expect(data.message).toEqual('category does not exist');
    });

    it('should return 400 status code if one field is missing', async () => {
      const { req, res } = createMocks({
        method: 'POST',
        body: {
          name: 'testing item',
          price: 20,
          cost: 10,
          category: 'food',
        },
      });

      await itemApi(req, res);
      const data = JSON.parse(res._getData());

      expect(res._getStatusCode()).toBe(400);
      expect(data.message).toEqual('all fields must not be empty');
    });

    it('should throw an error when method does not exist', async () => {
      const { req, res } = createMocks({
        method: 'PATCH',
      });

      await itemApi(req, res);
      const data = JSON.parse(res._getData());

      expect(res._getStatusCode()).toBe(404);
      expect(data.message).toEqual('Invalid method: does not exist');
    });

    it('should return an error message when something goes wrong', async () => {
      const { req, res } = createMocks({
        method: 'POST',
        body: {
          name: 'testing item',
          price: 20,
          cost: 10,
          openToSell: true,
          category: 'food',
        },
      });
      const error = new Error('something went wrong');
      (categoryController.findCategoryByName as jest.Mock).mockRejectedValue(
        error
      );

      await itemApi(req, res);
      const data = JSON.parse(res._getData());

      expect(connectDB).toHaveBeenCalled();
      expect(res._getStatusCode()).toBe(500);
      expect(data.message).toEqual(
        'failed to create item: something went wrong'
      );
    });
  });
});
