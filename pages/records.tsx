import AddRecordForm from '@/components/AddRecordForm';
import { IItem } from '@/server/models/item.model';
import axios from 'axios';
import { GetStaticProps } from 'next';

export type ItemType = {
  name: string;
  id: string;
};

type Props = {
  items: ItemType[];
};

const RecordPage = ({ items }: Props) => {
  return (
    <div>
      <AddRecordForm items={items} />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const res = await axios.get(`${process.env.HOST}/api/item`);
  const items = (res.data.data as IItem[]).map((item) => ({
    name: item.name,
    id: item._id,
  }));
  return {
    props: { items },
    revalidate: 1,
  };
};

export default RecordPage;
