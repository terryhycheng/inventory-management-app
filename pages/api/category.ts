import { connectDB } from '../../util/connectMongo';
import { categoryController } from '../../server/controllers/category.controller';
import { ICategory } from '../../server/models/category.model';
import type { NextApiRequest, NextApiResponse } from 'next';

interface CategoryApiRequest extends NextApiRequest {
  body: {
    name: string;
  };
}

export default async function handler(
  req: CategoryApiRequest,
  res: NextApiResponse<{ data: ICategory | ICategory[] } | { message: string }>
) {
  if (req.method === 'GET') {
    try {
      await connectDB();
      const categories = await categoryController.getAllCategories();
      res.status(200).json({ data: categories });
    } catch (error) {
      res.status(500).json({
        message: `failed to get all categories: ${(error as Error).message}`,
      });
    }
  } else if (req.method === 'POST') {
    const { name } = req.body;
    if (!name) {
      res.status(400).json({ message: '`name` is required' });
      return;
    }
    try {
      await connectDB();
      const category = await categoryController.addCategory({ name });
      res.status(201).json({ data: category });
    } catch (error) {
      res.status(500).json({
        message: `failed to create category: ${(error as Error).message}`,
      });
    }
  } else {
    res.status(404).json({ message: 'Invalid method: does not exist' });
  }
}
