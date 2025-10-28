/** @type {import('next').NextConfig} */
import nextI18nextConfig from './next-i18next.config.js';

const nextConfig = {
    images: {
        domains: ['drtunitski.neo-lines.bond'],
    },

    // ✅ ДОБАВЬТЕ ЭТО:
    async headers() {
        return [
            {
                source: '/locales/:path*',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'no-cache, no-store, must-revalidate'
                    }
                ],
            },
        ];
    },
};

export default nextConfig;


