/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'tailwindui.com',
                port: '',
                pathname: '/img/ecommerce-images/**'
            },
            {
                protocol: 'https',
                hostname: 'assets.adidas.com',
                port: '',
                pathname: '/images/**'
            }
        ]
    },
    env: {
        API_URL: process.env.API_URL
    }
}

module.exports = nextConfig
