/** @type {import('next').NextConfig} */
import nextI18nextConfig from './next-i18next.config.js';

const nextConfig = {
    // ✅ ВКЛЮЧАЕМ i18n - нужно для правильных canonical URL
    i18n: nextI18nextConfig.i18n,

    // ✅ Делаем BASIS_URL_MAIN доступным на клиенте
    publicRuntimeConfig: {
        BASIS_URL_MAIN: process.env.BASIS_URL_MAIN || 'https://drtunitski.co.il',
    },

    // 🚀 КРИТИЧЕСКИ ВАЖНЫЕ ОПТИМИЗАЦИИ:
    compress: true, // Включить GZIP сжатие
    swcMinify: true, // Быстрая минификация

    images: {
        domains: ['drtunitski.neo-lines.bond'], // ваш WordPress бэкенд
        formats: ['image/webp', 'image/avif'], // ← ДОБАВЬТЕ - ускорит на 50%
        minimumCacheTTL: 86400, // ← ДОБАВЬТЕ - кеш 24 часа
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    },

    // 📦 ОПТИМИЗАЦИЯ БАНДЛА:
    experimental: {
        optimizeCss: true, // ← ДОБАВЬТЕ - уменьшит CSS
    },

    // 🔧 ДОПОЛНИТЕЛЬНЫЕ ОПТИМИЗАЦИИ:
    poweredByHeader: false, // Убрать заголовок X-Powered-By
    generateEtags: false, // Отключить ETags для статики

};

export default nextConfig;


