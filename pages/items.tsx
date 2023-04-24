import AddItemForm from '@/components/AddItemForm';
import { ICategory } from '@/server/models/category.model';
import axios from 'axios';
import { useRouter } from 'next/router';
import { GetStaticProps } from 'next';
import ItemBox, { ItemData } from '@/components/ItemBox';
import { useContext } from 'react';
import { ModalContext } from '@/contexts/ModalContext';

interface Props {
  items: ItemData[];
  categories: ICategory[];
}

const Items = ({ items, categories }: Props) => {
  const router = useRouter();
  const modalStatus = useContext(ModalContext);

  return (
    <>
      {modalStatus?.isItemModal && (
        <div className="fixed left-0 top-0 flex h-screen w-screen items-center justify-center bg-black bg-opacity-70">
          <AddItemForm categories={categories} router={router} />
        </div>
      )}
      {items.length === 0 && <p>There is no item in the list.</p>}
      {items.length !== 0 && (
        <>
          <p className="my-4 font-light text-[#AAAAAA]">
            There are total {categories.length} kinds of items in the inventory.
          </p>
          <div className="grid gap-6 lg:grid-cols-3">
            {items.map((item) => (
              <ItemBox key={item._id} item={item} />
            ))}
          </div>
        </>
      )}
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const itemsRes = await axios.get(`${process.env.HOST}/api/item`);
  const categoriesRes = await axios.get(`${process.env.HOST}/api/category`);
  return {
    props: { items: itemsRes.data.data, categories: categoriesRes.data.data },
    revalidate: 1,
  };
};

export default Items;
