import AddItemForm from '@/components/AddItemForm';
import { ICategory } from '@/server/models/category.model';
import { IItem } from '@/server/models/item.model';
import axios from 'axios';

interface Props {
  items: IItem[];
  categories: ICategory[];
}

const items = ({ items, categories }: Props) => {
  return (
    <>
      <h1>Items</h1>
      <hr />
      <AddItemForm categories={categories} />
      <hr />
      {items.length === 0 && <p>There is no item in the list.</p>}
    </>
  );
};

export const getStaticProps = async () => {
  const itemsRes = await axios.get(`${process.env.HOST}/api/item`);
  const categoriesRes = await axios.get(`${process.env.HOST}/api/category`);
  return {
    props: { items: itemsRes.data.data, categories: categoriesRes.data.data },
    revalidate: 10,
  };
};

export default items;
