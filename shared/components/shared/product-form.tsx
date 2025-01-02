'use client';

import { ProductWithRelations } from '@/@types/prisma';
import { useCartStore } from '@/shared/store';
import React from 'react';
import toast from 'react-hot-toast';
import { ChoosePizzaForm } from './choose-pizza-form';
import { ChooseProductForm } from './choose-product-form';

interface Props {
  product: ProductWithRelations;
  onSubmit?: VoidFunction;
}

export const ProductForm: React.FC<Props> = ({ product, onSubmit: _onSubmit }) => {
  const [addCartItem, loading] = useCartStore((state) => [state.addCartItem, state.loading]);

  const firstItem = product.items[0];
  const isPizzaForm = Boolean(product.items[0].pizzaType);

  const onSubmit = async (productItemId?: number, ingredients?: number[]) => {
    try {
      const itemId = productItemId ?? firstItem.id;
      if (isPizzaForm && productItemId && ingredients) {
        await addCartItem({ productItemId: itemId, ingredients });
      } else {
        await addCartItem({ productItemId: firstItem.id });
      }
      toast.success(product.name + ' добавлена в корзину');

      _onSubmit?.();
    } catch (error) {
      toast.error('Ошибка при добавлении товар в корзину');
      console.error(error);
    }
  };

  if (isPizzaForm) {
    return (
      <ChoosePizzaForm
        imageUrl={product.imageUrl}
        name={product.name}
        ingredients={product.ingredients}
        items={product.items}
        onSubmit={onSubmit}
        loading={loading}
      />
    );
  }

  return (
    <ChooseProductForm
      imageUrl={product.imageUrl}
      name={product.name}
      onSubmit={onSubmit}
      price={firstItem.price}
      loading={loading}
    />
  );
};
