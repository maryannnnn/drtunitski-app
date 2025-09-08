import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { isRTL, getDirection, getTextAlign, getFlexDirection } from '../utils/rtl-utils';

/**
 * Custom hook for i18n with RTL support
 */
export const useI18n = () => {
    const router = useRouter();
    const { t, i18n } = useTranslation();
    const { locale } = router;

    return {
        t,
        i18n,
        locale,
        isRTL: isRTL(locale),
        direction: getDirection(locale),
        textAlign: getTextAlign(locale),
        flexDirection: getFlexDirection(locale),
        changeLanguage: (newLocale) => {
            router.push(router.asPath, router.asPath, { locale: newLocale });
        }
    };
};
