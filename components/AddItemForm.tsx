import { useState } from 'react';
import { NextRouter } from 'next/router';
import axios, { AxiosError } from 'axios';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { ICategory } from '@/server/models/category.model';

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

type Props = {
  categories: ICategory[];
  router: NextRouter;
};

const AddItemForm = ({ categories, router }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsSubmitting(true);
    try {
      await axios.post(`/api/item`, data);
      router.replace(router.asPath);
    } catch (error) {
      console.log((error as AxiosError).message);
    }
    setIsSubmitting(false);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Add a new item</h1>
      <input type="text" placeholder="name" {...register('name')} />
      <p>{errors.name?.message}</p>
      <label htmlFor="price">Price</label>
      <input
        id="price"
        type="number"
        defaultValue={0}
        step={0.05}
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
        step={0.05}
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
            <span>Public </span>
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
      <p>
        {errors.openToSell?.message && 'You must select one of the options'}
      </p>
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
      <input type="submit" disabled={isSubmitting} />
    </form>
  );
};

export default AddItemForm;
