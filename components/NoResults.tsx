import Image from "next/image";
import Link from "next/link";

export interface NoResultsProps {
  query?: string;
  className?: string;
  showNoResults?: boolean;
}

export function NoResults({ query, className, showNoResults }: NoResultsProps) {
  return (
    <div className={`flex flex-col ${className}`}>
      <Image
        alt="empty field with trees"
        src="/img/not_found.svg"
        width={300}
        height={300}
      />
      <div className="w-full flex flex-col items-center mt-5">
        {showNoResults ? (
          <h2 className="text-xl">
            We couldn&apos;t find any results matching &quot;<b>{query}</b>
            &quot;!
          </h2>
        ) : null}
        <span className="text-grays-middle">
          If you think a company is missing, you can add it below!
        </span>
        <Link href="/add">
          <a>
            <button className="bg-secondary-100 hover:bg-secondary-80 rounded-xl p-3 text-primary-white transition mt-5">
              Add Missing Company
            </button>
          </a>
        </Link>
      </div>
    </div>
  );
}
