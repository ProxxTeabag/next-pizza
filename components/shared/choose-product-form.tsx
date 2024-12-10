import { cn } from '@/lib/utils';
import React from 'react';
import { ProductImage } from './product-image';
import { Title } from './title';
import { Button } from '../ui';

interface Props {
  imageUrl: string;
  name: string;
  ingredients: any[];
  items?: any[];
  onClickAdd?: VoidFunction;
  className?: string;
}

export const ChooseProductForm: React.FC<Props> = ({
  name,
  items,
  imageUrl,
  ingredients,
  onClickAdd,
  className,
}) => {
  const textDetaills = '30 cm, 450 g';
  const totalPrice = 350;
  return (
    <div className={cn(className, 'flex flex-1')}>
      <div className={'flex items-center justify-center flex-1 relative w-full'}>
        <img
          src={imageUrl}
          alt="Logo"
          className={cn(
            'relative left-2 top-2 transition-all z-10 duration-300 w-[350px] h-[350px]',
          )}
        />
      </div>
      <div className="w-[490px] bg-[#FCFCFC] p-7">
        <Title text={name} size="md" className="font-extrabold mb-1" />

        <p className="text-gray-400">{textDetaills}</p>

        <Button className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10">
          Add to cart {totalPrice} грн
        </Button>
      </div>
    </div>
  );
};
