import { ICategory } from '@/server/models/category.model';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const formSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .regex(/^[A-Za-z ]+/),
  price: z.number().min(0, 'Price must be equal or greater than 0'),
  cost: z.number().min(0, 'Cost must be equal or greater than 0'),
  openToSell: z.boolean(),
  category: z.string().min(1, 'Category is required'),
});

type FormData = z.infer<typeof formSchema>;

const AddItemForm = ({ categories }: { categories: ICategory[] }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });
  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" placeholder="name" {...register('name')} />
      <p>{errors.name?.message}</p>
      <label htmlFor="price">Price</label>
      <input
        id="price"
        type="number"
        defaultValue={0}
        min={0}
        {...register('price', {
          valueAsNumber: true,
        })}
      />
      <p>{errors.price?.message}</p>
      <label htmlFor="cost">Cost</label>
      <input
        id="cost"
        type="number"
        defaultValue={0}
        min={0}
        {...register('cost', {
          valueAsNumber: true,
        })}
      />
      <p>{errors.cost?.message}</p>
      <Controller
        name="openToSell"
        control={control}
        render={({ field: { onChange, value } }) => (
          <div>
            <label>
              <input
                type="radio"
                onChange={() => onChange(true)}
                checked={value === true}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                onChange={() => onChange(false)}
                checked={value === false}
              />
              No
            </label>
          </div>
        )}
      />
      <p>{errors.openToSell?.message}</p>
      <select defaultValue="" {...register('category')}>
        {categories.length === 0 && (
          <option disabled value="">
            No category
          </option>
        )}
        {categories.length !== 0 && (
          <>
            <option disabled value="">
              Please select
            </option>
            {categories.map((category) => (
              <option key={category._id} value={category.name}>
                {category.name}
              </option>
            ))}
          </>
        )}
      </select>
      <p>{errors.category?.message}</p>
      <input type="submit" />
    </form>
  );
};

export default AddItemForm;
