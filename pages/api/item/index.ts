import { categoryController } from '../../../server/controllers/category.controller';
import { itemController } from '../../../server/controllers/item.controller';
import { IItem } from '../../../server/models/item.model';
import type { NextApiRequest, NextApiResponse } from 'next';

interface AddItemRequest extends NextApiRequest {
  body: {
    name: string;
    price: number;
    cost: number;
    openToSell: boolean;
    category: string;
  };
}

export default async function handler(
  req: AddItemRequest,
  res: NextApiResponse<IItem | { message: string }>
) {
  if (req.method === 'POST') {
    const { name, price, cost, openToSell, category } = req.body;

    if (!name || !price || !cost || openToSell === undefined || !category) {
      res.status(400).json({ message: 'all fields must not be empty' });
      return;
    }

    try {
      const result = await categoryController.findByName(category);
      if (result === null) {
        res.status(400).json({ message: 'category does not exist' });
        return;
      }

      const item = await itemController.addItem({
        name,
        price,
        cost,
        openToSell,
        category: result._id,
      });
      res.status(201).json(item);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  } else {
    res.status(400).json({ message: 'method does not exist' });
  }
}
