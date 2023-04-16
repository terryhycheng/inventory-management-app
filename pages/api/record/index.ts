import { connectDB } from '../../../util/connectMongo';
import { NextApiRequest, NextApiResponse } from 'next';
import { recordController } from '../../../server/controllers/record.controller';
import { itemController } from '../../../server/controllers/item.controller';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      await connectDB();
      const records = await recordController.getAllRecords();
      res.status(200).json({ data: records });
    } catch (error) {
      res.status(500).json({
        message: `failed to get records: ${(error as Error).message}`,
      });
    }
  } else if (req.method === 'POST') {
    const { type, quantity, item } = req.body;

    if (!type || !quantity || !item) {
      res.status(400).json({ message: 'all fields must not be empty' });
      return;
    }
    try {
      await connectDB();
      const record = await recordController.addRecord({ type, quantity, item });
      const newItem = await itemController.addRecord(item, record._id);
      res.status(200).json({ data: record, item: newItem });
    } catch (error) {
      res
        .status(500)
        .json({ message: `failed to add record: ${(error as Error).message}` });
    }
  } else {
    res.status(404).json({ message: 'Invalid method: does not exist' });
  }
}
