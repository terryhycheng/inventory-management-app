import { useContext, useState } from 'react';
import { NextRouter } from 'next/router';
import axios, { AxiosError } from 'axios';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { ICategory } from '@/server/models/category.model';
import { ModalDispatchContext } from '@/contexts/ModalContext';

const formSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .regex(/^[A-Za-z ]+/),
  price: z.number().min(1, 'Price must be greater than 0'),
  cost: z.number().min(1, 'Cost must be greater than 0'),
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
  const dispatch = useContext(ModalDispatchContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const closeModal = () =>
    dispatch!({
      type: 'ITEM',
      payload: false,
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
    closeModal();
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="min-w-[50%] rounded-xl bg-white p-8"
    >
      <h1 className="my-4 text-3xl font-bold capitalize">Add a new item</h1>
      <div className="my-4 flex flex-col gap-2">
        {/* Name */}
        <label className="mr-2" htmlFor="name">
          Name
        </label>
        <input type="text" id="name" {...register('name')} />
        {errors.name && <p className="error-box">{errors.name.message}</p>}
        <div className="flex gap-4">
          {/* Price */}
          <div className="flex flex-1 flex-col gap-2">
            <label className="mr-2" htmlFor="price">
              Price
            </label>
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
            {errors.price && (
              <p className="error-box">{errors.price.message}</p>
            )}
          </div>
          {/* Cost */}
          <div className="flex flex-1 flex-col gap-2">
            <label className="mr-2" htmlFor="cost">
              Cost
            </label>
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
            {errors.cost && <p className="error-box">{errors.cost.message}</p>}
          </div>
        </div>

        {/* Public */}
        <Controller
          name="openToSell"
          control={control}
          render={({ field: { onChange, value } }) => (
            <div className="my-2">
              <span className="mr-2">Is public? </span>
              <input
                type="radio"
                onChange={() => onChange(true)}
                checked={value === true}
              />
              <span className="ml-1 mr-2">Yes</span>

              <input
                type="radio"
                onChange={() => onChange(false)}
                checked={value === false}
              />
              <span className="ml-1 mr-2">No</span>
            </div>
          )}
        />
        {errors.openToSell && (
          <p className="error-box">You must select one of the options</p>
        )}
        {/* Category */}
        <label htmlFor="category">Category</label>
        <select id="category" defaultValue="" {...register('category')}>
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
        {errors.category && (
          <p className="error-box">{errors.category.message}</p>
        )}
        <input
          type="submit"
          className="mt-6 cursor-pointer rounded-lg bg-secondary p-4 font-semibold text-white"
          disabled={isSubmitting}
        />
        <button
          type="button"
          onClick={closeModal}
          className="mt-2 cursor-pointer rounded-lg border p-4 font-semibold text-gray-300 hover:border-red-400 hover:text-red-500"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default AddItemForm;
