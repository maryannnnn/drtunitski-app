/** @type {import('next').NextConfig} */
import nextI18nextConfig from './next-i18next.config.js';

const nextConfig = {
    // ✅ ВКЛЮЧЕНО: i18n конфигурация для корректной загрузки переводов на сервере
    // Middleware теперь пустой (не делает редиректы), поэтому конфликта нет
    // Это решает проблему показа ключей переводов вместо реальных текстов
    i18n: nextI18nextConfig.i18n,
    images: {
        domains: ['drtunitski.neo-lines.bond'],
    },
};

export default nextConfig;


