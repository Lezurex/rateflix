import Head from "next/head";
import Image from "next/image";
import { MouseEventHandler, useState } from "react";
import { Plus } from "react-bootstrap-icons";
import { Input } from "../components/Input";

export default function Add() {
  const [companyName, setCompanyName] = useState("");
  const [description, setDescription] = useState("");

  const onClick: MouseEventHandler<HTMLButtonElement> = () => {
    if (companyName === "" || description === "") {
      alert("Please fill out all the fields");
      return;
    }

    fetch("/api/addCompany", {
      method: "POST",
      body: JSON.stringify({
        name: companyName,
        description: description,
      }),
    }).then((res) => {
      if (res.status == 200) {
        alert("Successfully added the company!");
      }
    });
  };

  return (
    <>
      <Head>
        <title>Rateflix - Add Missing</title>
      </Head>
      <section className="h-96 flex flex-col md:flex-row justify-center items-center gap-3">
        <Image
          alt="person adding content on website"
          src="/img/add_information.svg"
          width={300}
          height={300}
        />
        <div>
          <h1 className="text-4xl text-center md:text-left">
            Couldn&apos;t find a company?
          </h1>
          <p className="text-center md:text-left text-grays-middle">
            No problem! Add it below!
          </p>
        </div>
      </section>
      <section className="flex justify-center">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col gap-3"
        >
          <label>
            Company Name{" "}
            <Input
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Weihnachtsmann &amp; Co. KG"
            />
          </label>
          <label>
            Short description{" "}
            <Input
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What does this company do?"
            />
          </label>
          <button
            onClick={onClick}
            className="bg-primary-100 hover:bg-primary-60 rounded-xl p-3 text-primary-white transition"
          >
            <Plus className="inline-block" /> Add Company
          </button>
        </form>
      </section>
    </>
  );
}
