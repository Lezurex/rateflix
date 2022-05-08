import { Company, PrismaClient } from "@prisma/client";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { NoResults } from "../../components/NoResults";
import { SearchBox } from "../../components/SearchBox";
import { SearchResult } from "../../components/SearchResult";

interface SearchProps {
  results: Company[];
}

export default function Search({ results }: SearchProps) {
  const router = useRouter();
  const { query } = router.query;

  return (
    <div className="flex flex-col">
      <SearchBox placeholder="Search..." initialTerm={query?.toString()} />
      <ul className="mt-5">
        {results.map((company) => (
          <li key={company.id}>
            <SearchResult company={company} />
          </li>
        ))}
      </ul>
      <NoResults className="mt-5" query={query?.toString()} showNoResults={results.length === 0} />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<SearchProps> = async ({
  query,
}) => {
  const prisma = new PrismaClient();
  const results = await prisma.company.findMany({
    where: { name: { contains: query.query?.toString() } },
  });

  return {
    props: { results },
  };
};
