import { ItemType } from '@/pages/records';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  type: z.enum(['sold', 'import']),
  quantity: z.number().min(1, 'Quantity must be greater than 0'),
  item: z.string().min(1, 'Item is required'),
});

type FormData = z.infer<typeof formSchema>;

type Props = {
  items: ItemType[];
};

const AddRecordForm = ({ items }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });
  const router = useRouter();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const res = await axios.post('/api/record', data);
    console.log(res.data.message);
    router.push('/items');
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="quantity">Quantity</label>
        <input
          defaultValue={0}
          type="number"
          id="quantity"
          {...register('quantity', {
            valueAsNumber: true,
          })}
        />
        <p>{errors.quantity?.message}</p>
        <label htmlFor="item">Item</label>
        <select id="item" defaultValue="" {...register('item')}>
          <option value="" disabled>
            Please select
          </option>
          {items.map(({ id, name }) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </select>
        <p>{errors.item?.message}</p>
        <label htmlFor="type">Type</label>
        <select id="type" defaultValue="" {...register('type')}>
          <option value="" disabled>
            Please select
          </option>
          <option value="import">Import</option>
          <option value="sold">Sold</option>
        </select>
        <p>{errors.type?.message && 'You must select a record type'}</p>
        <input type="submit" />
      </form>
    </>
  );
};

export default AddRecordForm;
