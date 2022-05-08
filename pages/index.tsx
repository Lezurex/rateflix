import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { SearchBox } from "../components/SearchBox";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Rateflix - Home</title>
        <meta
          name="description"
          content="Rateflix is the most trustworthy rating platform on the market."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="h-96 flex flex-col md:flex-row justify-center items-center gap-3">
        <Image
          alt="feedback icon"
          src="/img/feedback.svg"
          width={300}
          height={300}
        />
        <div>
          <h1 className="text-4xl text-center md:text-left">
            The most trusted platform for rating companies
          </h1>
          <SearchBox
            className="mt-5 w-full"
            placeholder="Which company are you interested in?"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
