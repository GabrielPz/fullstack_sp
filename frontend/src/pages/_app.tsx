import { FileProvider } from "@/contexts/FileContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <FileProvider>
      <Component {...pageProps} />
    </FileProvider>
  )
}
