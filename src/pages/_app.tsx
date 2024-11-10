import type { AppProps } from "next/app";
import "../styles/globals.css";
import NavBar from "@/components/NavBar";

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <NavBar />
      <Component {...pageProps} />
    </>
  );
}

export default App;
