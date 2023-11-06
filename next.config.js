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
        API_URL: 'http://localhost:8080/api/v1'
    }
}

module.exports = nextConfig
