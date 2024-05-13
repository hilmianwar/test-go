import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.layer.css";
import "mantine-datatable/styles.layer.css";
import "@/styles/globals.css";
import "./layout.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ColorSchemeScript defaultColorScheme="auto" />
      <MantineProvider defaultColorScheme="auto">
        <Component {...pageProps} />
      </MantineProvider>
    </>
  );
}
