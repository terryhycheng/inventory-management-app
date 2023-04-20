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
    return total || 'Out of stock';
  };

  return (
    <div>
      <p>{item.name}</p>
      <p>£ {item.price}</p>
      <p>{calculateQty()}</p>
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
