/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    const headers = [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Methods', value: 'GET,POST,PATCH,DELETE,OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization' },
          { key: 'Access-Control-Max-Age', value: '86400' },
        ],
      },
    ];

    if (process.env.NODE_ENV === 'development') {
      headers[0].headers.unshift(
        { key: 'Access-Control-Allow-Origin', value: '*' }
      );
    }

    return headers;
  },
};

export default nextConfig;
