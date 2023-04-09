import mongoose, { ConnectOptions } from 'mongoose';

const getUrl = (): string => {
  if (process.env.NODE_ENV === 'test') {
    return 'mongodb://0.0.0.0/mern-inventory-test';
  } else {
    return process.env.MONGODB_URL || 'mongodb://0.0.0.0/mern-inventory';
  }
};

const url = getUrl();
const option = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as ConnectOptions;

export const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection.asPromise();
  }
  return await mongoose.connect(url, option);
};
