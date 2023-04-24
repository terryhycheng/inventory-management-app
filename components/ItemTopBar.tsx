import { ModalDispatchContext } from '@/contexts/ModalContext';
import React, { useContext } from 'react';
import { IoIosAddCircleOutline } from 'react-icons/io';

const ItemTopBar = () => {
  const dispatch = useContext(ModalDispatchContext);

  return (
    <div className="bg-darkMain px-8 py-6 text-white">
      <button
        onClick={() =>
          dispatch!({
            type: 'ITEM',
            payload: true,
          })
        }
        className="flex gap-2 rounded-md bg-secondary px-8 py-4 font-semibold capitalize"
      >
        <IoIosAddCircleOutline className="h-6 w-6" />
        new item
      </button>
    </div>
  );
};

export default ItemTopBar;
