// hooks/useSafeTranslation.js
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export const useSafeTranslation = (namespace = 'common') => {
    const { t, i18n, ready } = useTranslation(namespace);
    const router = useRouter();
    const [forceReady, setForceReady] = useState(false);

    // useEffect(() => {
    //     if (typeof window !== 'undefined' && window.i18n && !ready) {
    //         const loadTranslations = async () => {
    //             try {
    //                 await window.i18n.reloadResources([router.locale], [namespace]);
    //             } catch (error) {
    //                 console.log('Translation load failed:', error);
    //             }
    //         };
    //         loadTranslations();
    //     }
    //
    //     const timer = setTimeout(() => {
    //         setForceReady(true);
    //     }, 3000);
    //
    //     return () => clearTimeout(timer);
    // }, [ready, router.locale, namespace]);

    const safeTrans = (key, options = {}) => {
        if (!ready && !forceReady) {
            return options.defaultValue || '...';
        }

        const translation = t(key, options);
        if (translation === key) {
            return options.defaultValue || key;
        }

        return translation;
    };

    return {
        t: safeTrans,
        i18n,
        ready: ready || forceReady,
        currentLanguage: router.locale || 'en'
    };
};
