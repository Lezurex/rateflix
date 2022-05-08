import "../styles/globals.css";
import type { AppProps } from "next/app";
import { StarFill } from "react-bootstrap-icons";
import Link from "next/link";

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <header className="flex justify-between items-center bg-primary-100 p-3">
        <div>
          <Link href="/">
            <a className="text-xl">
              <StarFill className="inline-block fill-secondary-80" /> Rateflix
            </a>
          </Link>
        </div>
      </header>
      <main className="p-3">
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default App;
