import type { NextConfig } from "next";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        pathname: "/u/**",
      },
    ],
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm, remarkMath],
    rehypePlugins: [],
    // If you use `MDXProvider`, uncomment the following line.
    //   providerImportSource: "@mdx-js/react",
  },
});
export default withMDX(nextConfig);
