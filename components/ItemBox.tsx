import Image from 'next/image';

type Props = {
  item: ItemData;
};

const ItemBox = ({ item }: Props) => {
  const calculateQty = () => {
    let total = 0;
    if (item.records.length !== 0) {
      item.records.forEach((record) => {
        if (record.type === 'import') {
          total += record.quantity;
        } else {
          total -= record.quantity;
        }
      });
    }
    return total || 'N/A';
  };

  return (
    <div className="overflow-hidden rounded-xl bg-white">
      <div className="flex gap-8 p-8">
        <Image
          src="/apple.jpeg"
          width={120}
          height={120}
          alt="morrisons logo"
        />
        <div className="flex flex-col justify-center">
          <p className="text-2xl font-bold capitalize text-darkMain">
            {item.name}
          </p>
        </div>
      </div>
      <div className="grid h-full grid-cols-3 gap-2 bg-darkMain px-8 py-4 text-white">
        <div>
          <p className="text-sm font-light">Price</p>
          <p className="text-2xl font-semibold tracking-wider">
            £ {item.price}
          </p>
        </div>
        <div>
          <p className="text-sm font-light">Stock</p>
          <p className="text-2xl font-semibold tracking-wider">
            {calculateQty()}
          </p>
        </div>
        <div>
          <p className="text-sm font-light">Sold (30 days)</p>
          <p className="text-2xl font-semibold tracking-wider">246</p>
        </div>
      </div>
    </div>
  );
};

export type ItemData = {
  _id: string;
  name: string;
  price: number;
  cost: number;
  openToSell: boolean;
  category: {
    _id: string;
    name: string;
    __v: number;
  };
  records: {
    _id: string;
    type: 'import' | 'sold';
    quantity: number;
  }[];
  __v: number;
};

export default ItemBox;
