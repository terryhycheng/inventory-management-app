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
  res: NextApiResponse<ICategory | { message: string }>
) {
  if (req.method === 'POST') {
    const { name } = req.body;
    if (!name) {
      res.status(400).json({ message: '`name` is required' });
      return;
    }
    try {
      await connectDB();
      const category = await categoryController.addCategory({ name });
      res.status(201).json(category);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  } else {
    res.status(400).json({ message: 'method does not exist' });
  }
}
