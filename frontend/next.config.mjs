// // next.config.mjs
// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   serverExternalPackages: ['@restackio/ai'],
// }
// export default nextConfig;

// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverExternalPackages: ['@restackio/ai'], // Moved into the `experimental` section for Next.js 15
  },
};

export default nextConfig;
