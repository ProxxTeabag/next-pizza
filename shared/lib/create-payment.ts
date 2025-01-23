import { PaymentData } from '@/@types/payment';
import axios from 'axios';

interface Props {
  description: string;
  orderId: number;
  amount: number;
}

export async function createPayment(details: any) {
  const { data } = await axios.post<PaymentData>(
    'https://api.yookassa.ru/v3/payments',
    {
      amount: {
        value: details.amount,
        currency: 'UAH',
      },
      capture: true,
      description: details.description,
      metadata: {
        order_id: details.orderId,
      },
      confirmation: {
        type: 'redirect',
        return_url: process.env.PAYMENT_CALLBACK_URL,
      },
    },
    {
      auth: {
        username: process.env.PAYMENT_STORE_ID as string, //id магазина
        password: process.env.YOOKASSA_API_KEY as string,
      },
      headers: {
        'Idempotence-Key': Math.random().toString(36).substring(7),
      },
    },
  );

  return data;
}
