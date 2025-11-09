// hooks/useSafeTranslation.js
import { useTranslation } from 'next-i18next';

export const useSafeTranslation = () => {
    const { t, i18n, ready } = useTranslation('common');

    return {
        t,
        i18n,
        ready
    };
};
