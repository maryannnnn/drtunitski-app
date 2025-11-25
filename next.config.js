/** @type {import('next').NextConfig} */
const nextI18nextConfig = require('./next-i18next.config.js');

const nextConfig = {
    i18n: nextI18nextConfig.i18n,
    images: {
        domains: ['drtunitski.neo-lines.bond'],
    },

    // ✅ ДОБАВЬТЕ для Cloudflare
    trailingSlash: false,
    compress: true,

    // ✅ Важно для Next.js с Cloudflare
    poweredByHeader: false,
    generateEtags: false,

    // ✅ ПРАВИЛЬНОЕ добавление для Яндекс
    async redirects() {
        return [
            {
                source: '/yandex_2fb6a14af61a8c12.html',
                destination: '/api/yandex-verify',
                permanent: false,
            },
        ];
    },
};

module.exports = nextConfig;

