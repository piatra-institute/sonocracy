/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: [
        '@turf/turf',
        '@turf/area',
    ],
};

export default nextConfig;
