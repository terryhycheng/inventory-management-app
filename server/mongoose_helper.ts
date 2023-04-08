import mongoose, { ConnectOptions } from 'mongoose';

beforeAll(async () => {
  const mongoUrl: string = 'mongodb://0.0.0.0/mern-inventory-test';

  await mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoose.connection.close();
});
