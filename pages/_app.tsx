import type { AppProps } from "next/app";
import "../styles/globals.css";
import Head from "next/head";
import { Toaster } from "react-hot-toast";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Component {...pageProps} />

      {/* 🔹 Toaster pentru notificări globale */}
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}
