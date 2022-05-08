import { PrismaClient } from "@prisma/client";
import { GetServerSideProps } from "next";
import { Star, StarFill } from "react-bootstrap-icons";
import Image from "next/image";
import { Input } from "../../components/Input";
import { Textarea } from "../../components/Textarea";
import Head from "next/head";
import { FormEventHandler, useState } from "react";
import ReactStars from "react-rating-stars-component";
import { RatingElement } from "../../components/RatingElement";

interface ExtendedCompany {
  id?: number;
  name?: string;
  description?: string | null;
  ratings?: {
    id?: number;
    summary?: string | null;
    description?: string | null;
    points?: number;
  }[];
  averagePoints: number;
}

interface CompanyProps {
  company: ExtendedCompany;
}

export default function Company({ company }: CompanyProps) {
  const [summary, setSummary] = useState("");
  const [description, setDescription] = useState("");
  const [points, setPoints] = useState(4);
  const submitForm: FormEventHandler = (e) => {
    e.preventDefault();

    if (summary === "" || description === "" || points === 0) {
      alert("Please fill out all the fields and give a rating.");
      return;
    }

    fetch("/api/addReview", {
      method: "POST",
      body: JSON.stringify({
        id: company.id,
        summary,
        description,
        points,
      }),
    });
  };

  return (
    <div className="flex flex-col md:items-center">
      <Head>
        <title>Rateflix - {company.name}</title>
      </Head>
      <div className="md:w-3/4">
        <section>
          <h1 className="text-3xl">{company.name}</h1>
          <p>
            <StarFill className="inline-block fill-secondary-80" />{" "}
            {company.averagePoints.toLocaleString()}
          </p>
          <p className="text-grays-middle">{company.description}</p>
        </section>
        <section className="mt-5 flex flex-col md:flex-row gap-5">
          <form className="md:grow flex flex-col gap-3" onSubmit={submitForm}>
            <h2 className="text-xl">Add your review!</h2>
            <ReactStars
              count={5}
              onChange={(newRating: number) => setPoints(newRating)}
              activeColor="#4D6F48"
              size={50}
              color="#EEEEEE"
            />
            <Input
              placeholder="Summary"
              onChange={(e) => setSummary(e.target.value)}
            />
            <Textarea
              placeholder="Very interesting company ..."
              className="h-52"
              onChange={(e) => setDescription(e.target.value)}
            />
            <button
              type="submit"
              className="bg-primary-100 hover:bg-primary-60 rounded-xl p-3 text-primary-white transition"
            >
              <Star className="inline-block" /> Submit Review
            </button>
          </form>
          <Image
            src="/img/add_review.svg"
            alt="Person reviewing"
            width={300}
            height={300}
          />
        </section>
        <section className="flex flex-col gap-5 mt-5">
          <h3 className="text-xl">
            What do other users say about this company?
          </h3>
          {company.ratings?.map((rating) => (
            <RatingElement key={rating.id} rating={rating} />
          ))}
          {company.ratings?.length === 0 ? (
            <Image
              src="/img/no_data.svg"
              alt="empty pages"
              width={300}
              height={300}
            />
          ) : null}
        </section>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<CompanyProps> = async ({
  query: { id },
}) => {
  if (id && !Array.isArray(id) && parseInt(id)) {
    const prisma = new PrismaClient();
    const company = await prisma.company.findUnique({
      where: { id: parseInt(id) },
      include: {
        ratings: {
          orderBy: { creationDate: "desc" },
          select: { id: true, description: true, points: true, summary: true },
        },
      },
    });

    return {
      props: {
        company: {
          ...company,
          averagePoints: calculateAverage(company!.ratings),
        },
      },
    };
  }
  return {
    notFound: true,
  };
};

function calculateAverage(ratings: { points: number }[]): number {
  if (ratings.length === 0) return 0;
  let total: number = 0;
  ratings.forEach((rating) => (total += rating.points));
  return total / ratings.length;
}
