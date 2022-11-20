// import "~/styles/globals.css";
import type { AppProps } from "next/app";
import { Analytics } from "@vercel/analytics/react";
import "antd/dist/reset.css";
import { ConfigProvider } from "antd";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ConfigProvider>
      <Component {...pageProps} />
      <Analytics />
    </ConfigProvider>
  );
}

export default MyApp;
