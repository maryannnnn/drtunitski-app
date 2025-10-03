import { useEffect } from 'react';
import { useRouter } from 'next/router';

// Клиентский редирект для /en маршрута
// Статическая страница вместо SSR для избежания проблем с Vercel
export default function EnPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/');
  }, [router]);

  return null;
}