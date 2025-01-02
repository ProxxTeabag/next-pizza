import crypto from 'crypto';
import { prisma } from '@/prisma/prisma-client';
import { NextRequest, NextResponse } from 'next/server';
import { findOrCreateCart } from '@/shared/lib/find-or-create-cart';
import { CreateCartItemValues } from '@/shared/services/dto/cart-dto';
import { updateCartTotalAmount } from '@/shared/lib/update-cart-total-amount';

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('cartToken')?.value;

    if (!token) {
      return NextResponse.json({ totalAmount: 0, items: [] });
    }

    const userCart = await prisma.cart.findFirst({
      where: {
        OR: [
          {
            token,
          },
        ],
      },
      include: {
        items: {
          orderBy: {
            createAt: 'desc',
          },
          include: {
            productItem: {
              include: {
                product: true,
              },
            },
            ingredients: true,
          },
        },
      },
    });

    return NextResponse.json(userCart);
  } catch (e) {
    console.error('[CART_GET] Server error', e);
    return NextResponse.json({ error: 'Ошибка при получении корзины' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    let token = req.cookies.get('cartToken')?.value;

    if (!token) {
      token = crypto.randomUUID();
    }

    const userCart = await findOrCreateCart(token);

    const data = (await req.json()) as CreateCartItemValues;

    const findCartItem = await prisma.cartItem.findFirst({
      where: {
        cartId: userCart.id,
        productItemId: data.productItemId,
        ingredients: data.ingredients
          ? {
              every: {
                id: {
                  in: data.ingredients,
                },
              },
            }
          : undefined,
      },
    });

    // Если товар был найден, то увеличиваем его количество на 1
    if (findCartItem) {
      await prisma.cartItem.update({
        where: {
          id: findCartItem.id,
        },
        data: {
          quantity: findCartItem.quantity + 1,
        },
      });
    } else {
      await prisma.cartItem.create({
        data: {
          cartId: userCart.id,
          productItemId: data.productItemId,
          quantity: 1,
          ingredients: {
            connect: data.ingredients?.map((id) => ({ id })),
          },
        },
      });
    }

    const updateUserCart = await updateCartTotalAmount(token);

    const resp = NextResponse.json(updateUserCart);

    resp.cookies.set('cartToken', token);

    return resp;
  } catch (e) {
    console.error('[CART_POST] Server error', e);
    return NextResponse.json({ error: 'Ошибка при добавлении товара в корзину' }, { status: 500 });
  }
}
