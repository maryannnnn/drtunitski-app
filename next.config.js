/** @type {import('next').NextConfig} */
const nextI18nextConfig = require('./next-i18next.config.js');

const nextConfig = {
    i18n: nextI18nextConfig.i18n,
    images: {
        domains: ['drtunitski.neo-lines.bond'],
    },
};

module.exports = nextConfig;

