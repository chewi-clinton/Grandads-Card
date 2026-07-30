import { fileURLToPath } from "url";
import { dirname } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  turbopack: {
    root: __dirname,
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "62.171.174.37",
        port: "13012",
        pathname: "/grandadscards/**",
        search: "",
      },
    ],
  },
};

export default nextConfig;
