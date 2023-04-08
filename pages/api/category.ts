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
    try {
      const category = await categoryController.addCategory({ name });
      res.status(201).json(category);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  } else {
    res.status(404).json({ message: 'This route does not exist.' });
  }
}
