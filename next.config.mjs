const BASE_PATH = '/nas-booth-event'

const nextConfig = {
  output: 'export',
  basePath: BASE_PATH,
  assetPrefix: `${BASE_PATH}/`,
  env: {
    NEXT_PUBLIC_BASE_PATH: BASE_PATH,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
