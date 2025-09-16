import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { addLanguageSuffix, removeLanguageSuffix, isStaticPath } from '../utils/utils-url';

/**
 * Хук для автоматического обновления URL с языковыми суффиксами
 */
export const useLanguageUrl = () => {
    const router = useRouter();
    const { locale, asPath } = router;

    useEffect(() => {
        // Проверяем, нужно ли обновить URL
        const currentPath = removeLanguageSuffix(asPath);
        
        // Если это статический путь, не добавляем суффикс
        if (isStaticPath(currentPath)) {
            if (asPath !== currentPath) {
                router.replace(currentPath, undefined, { locale, shallow: true });
            }
        } else {
            // Для slug страниц добавляем языковой суффикс
            const expectedPath = addLanguageSuffix(currentPath, locale);
            if (asPath !== expectedPath) {
                router.replace(expectedPath, undefined, { locale, shallow: true });
            }
        }
    }, [locale, asPath, router]);
};
