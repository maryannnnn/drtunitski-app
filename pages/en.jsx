import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function EnPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/');
  }, [router]);

  return null;
} 