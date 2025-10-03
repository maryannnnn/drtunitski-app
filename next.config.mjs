/** @type {import('next').NextConfig} */
import nextI18nextConfig from './next-i18next.config.js';

const nextConfig = {
    i18n: nextI18nextConfig.i18n,
    trailingSlash: false,
    async redirects() {
        return [
            {
                source: '/en',
                destination: '/',
                permanent: true,
            },
            {
                source: '/en/:path*',
                destination: '/:path*',
                permanent: true,
            },
        ];
    },
    images: {
        domains: ['drtunitski.neo-lines.bond'],
    },
    webpack(config, { isServer }) {
        // Пример настройки splitChunks для клиентских и серверных бандлов
        config.optimization.splitChunks = {
            chunks: 'all',
            minSize: 20000,
            maxSize: 70000,
        };

        if (!isServer) {
            config.optimization.minimize = true;
        }

        return config;
    },
    compress: true,
};

export default nextConfig;


