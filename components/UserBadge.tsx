import Image from 'next/image';
import React from 'react';

const UserBadge = () => {
  return (
    <div className="flex gap-4 rounded-full border px-4 py-2">
      <Image
        alt=""
        src="/profile-pic.jpeg"
        className="rounded-full"
        width={50}
        height={50}
      />
      <div className="mr-2 flex flex-col justify-center">
        <p className="text-lg font-bold capitalize">terry cheng</p>
        <p className="text-sm font-light capitalize">admin</p>
      </div>
    </div>
  );
};

export default UserBadge;
