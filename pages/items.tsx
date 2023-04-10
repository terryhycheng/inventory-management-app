import { useState } from 'react';
import AddItemForm from '@/components/AddItemForm';
import { ICategory } from '@/server/models/category.model';
import { IItem } from '@/server/models/item.model';
import axios from 'axios';
import { useRouter } from 'next/router';

interface Props {
  items: IItem[];
  categories: ICategory[];
}

const Items = ({ items, categories }: Props) => {
  const router = useRouter();
  return (
    <>
      <hr />
      <AddItemForm categories={categories} router={router} />
      <hr />
      {items.length === 0 && <p>There is no item in the list.</p>}
      {items.length !== 0 &&
        items.map((item) => (
          <div key={item._id}>
            <p>{item.name}</p>
            <p>£ {item.price}</p>
          </div>
        ))}
    </>
  );
};

export const getStaticProps = async () => {
  const itemsRes = await axios.get(`${process.env.HOST}/api/item`);
  const categoriesRes = await axios.get(`${process.env.HOST}/api/category`);
  return {
    props: { items: itemsRes.data.data, categories: categoriesRes.data.data },
    revalidate: 1,
  };
};

export default Items;
