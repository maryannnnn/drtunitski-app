/** @type {import('next').NextConfig} */
import nextI18nextConfig from './next-i18next.config.js';

const nextConfig = {
    // ❌ ВАЖНО: Эта строка закомментирована для устранения конфликта с middleware.js
    // Встроенный i18n Next.js конфликтует с кастомным middleware роутингом на Vercel
    // next-i18next продолжит работать через serverSideTranslations в getStaticProps
    // i18n: nextI18nextConfig.i18n,
    images: {
        domains: ['drtunitski.neo-lines.bond'],
    },
};

export default nextConfig;


