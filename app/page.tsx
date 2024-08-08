import {
  Container,
  Title,
  Categories,
  SortPopup,
  TopBar,
  Filters,
  ProductCard,
} from '@/components/shared';
import { ProductsGroupList } from '@/components/shared/products-group-list';

export default function Home() {
  return (
    <>
      <Container className="mt-10">
        <Title text="All pizzas" size="lg" className="font-extrabold" />
      </Container>
      <TopBar />

      <Container className="mt-10 pb-14">
        <div className="flex gap-[80px]">
          {/* Фильтрация */}
          <div className="w-[250px]">
            <Filters />
          </div>
          {/* Список товарок */}
          <div className="flex-1">
            <div className="flex flex-col gap-16">
              <ProductsGroupList
                title={'Пиццы'}
                items={[
                  {
                    id: 1,
                    name: 'Пепперони',
                    imageUrl: '',
                    items: [{ price: 200 }],
                  },
                  {
                    id: 2,
                    name: 'Пепперони',
                    imageUrl: '',
                    items: [{ price: 200 }],
                  },
                  {
                    id: 3,
                    name: 'Пепперони',
                    imageUrl: '',
                    items: [{ price: 200 }],
                  },
                  {
                    id: 4,
                    name: 'Пепперони',
                    imageUrl: '',
                    items: [{ price: 200 }],
                  },
                ]}
                categoryId={1}
              />
              <ProductsGroupList
                title={'Комбо'}
                items={[
                  {
                    id: 5,
                    name: 'Пепперони',
                    imageUrl: '',
                    items: [{ price: 200 }],
                  },
                  {
                    id: 6,
                    name: 'Пепперони',
                    imageUrl: '',
                    items: [{ price: 200 }],
                  },
                  {
                    id: 7,
                    name: 'Пепперони',
                    imageUrl: '',
                    items: [{ price: 200 }],
                  },
                  {
                    id: 8,
                    name: 'Пепперони',
                    imageUrl: '',
                    items: [{ price: 200 }],
                  },
                ]}
                categoryId={2}
              />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
