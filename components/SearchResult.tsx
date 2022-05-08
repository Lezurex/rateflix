import { Company } from "@prisma/client";
import { useRouter } from "next/router";
import { MouseEventHandler } from "react";

export interface SearchResultProps {
  company: Company;
}

export function SearchResult({ company }: SearchResultProps) {
  const router = useRouter();

  const onClick: MouseEventHandler = () => {
    router.push(`/company/${company.id}`);
  };

  return (
    <div
      className="rounded-lg border border-primary-80 p-3 cursor-pointer hover:bg-grays-bright transition mb-3"
      onClick={onClick}
    >
      <h3 className="text-xl font-bold text-primary-80">{company.name}</h3>
      <p>{company.description}</p>
    </div>
  );
}
