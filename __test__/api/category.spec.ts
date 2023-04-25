import { createMocks } from 'node-mocks-http';
import categoryApi from '../../pages/api/category';

import { connectDB } from '../../util/connectMongo';
import { categoryController } from '../../server/controllers/category.controller';

jest.mock('../../util/connectMongo');
jest.mock('../../server/controllers/category.controller');

describe('category api unit tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET route', () => {
    it('should return a list of categories with status code 200', async () => {
      const { req, res } = createMocks({
        method: 'GET',
      });

      const categoriesMock = [
        { _id: '1', name: 'test 1' },
        { _id: '2', name: 'test 2' },
        { _id: '3', name: 'test 3' },
      ];

      (categoryController.getAllCategories as jest.Mock).mockResolvedValue(
        categoriesMock
      );

      await categoryApi(req, res);
      const data = JSON.parse(res._getData());

      expect(connectDB).toHaveBeenCalled();
      expect(res._getStatusCode()).toBe(200);
      expect(data.data.length).toEqual(3);
    });

    it('should return an error message when something goes wrong', async () => {
      const { req, res } = createMocks({
        method: 'GET',
      });
      const error = new Error('something went wrong');
      (categoryController.getAllCategories as jest.Mock).mockRejectedValue(
        error
      );

      await categoryApi(req, res);
      const data = JSON.parse(res._getData());

      expect(connectDB).toHaveBeenCalled();
      expect(res._getStatusCode()).toBe(500);
      expect(data.message).toEqual(
        'failed to get all categories: something went wrong'
      );
    });
  });

  describe('POST route', () => {
    it('should return a new category with status code 201', async () => {
      const { req, res } = createMocks({
        method: 'POST',
        body: {
          name: 'something',
        },
      });

      const categoryMock = { _id: '1', name: 'something' };

      (categoryController.addCategory as jest.Mock).mockResolvedValue(
        categoryMock
      );

      await categoryApi(req, res);
      const data = JSON.parse(res._getData());

      expect(connectDB).toHaveBeenCalled();
      expect(categoryController.addCategory).toHaveBeenCalledWith({
        name: 'something',
      });
      expect(res._getStatusCode()).toBe(201);
      expect(data.data).toEqual(categoryMock);
    });

    it('should throw an error when `name` is missing', async () => {
      const { req, res } = createMocks({
        method: 'POST',
      });

      await categoryApi(req, res);
      const data = JSON.parse(res._getData());

      expect(res._getStatusCode()).toBe(400);
      expect(data.message).toEqual('`name` is required');
    });

    it('should return an error message when something goes wrong', async () => {
      const { req, res } = createMocks({
        method: 'POST',
        body: {
          name: 'something',
        },
      });
      const error = new Error('something went wrong');
      (categoryController.addCategory as jest.Mock).mockRejectedValue(error);

      await categoryApi(req, res);
      const data = JSON.parse(res._getData());

      expect(connectDB).toHaveBeenCalled();
      expect(res._getStatusCode()).toBe(500);
      expect(data.message).toEqual(
        'failed to create category: something went wrong'
      );
    });

    it('should throw an error when method does not exist', async () => {
      const { req, res } = createMocks({
        method: 'PATCH',
      });

      await categoryApi(req, res);
      const data = JSON.parse(res._getData());

      expect(res._getStatusCode()).toBe(404);
      expect(data.message).toEqual('Invalid method: does not exist');
    });
  });
});
