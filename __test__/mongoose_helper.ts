import { connectDB } from '../util/connectMongo';
import mongoose from 'mongoose';

beforeAll(async () => {
  await connectDB();
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoose.connection.close();
});
