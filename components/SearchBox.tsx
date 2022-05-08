import { useRouter } from "next/router";
import { useState } from "react";
import { Search } from "react-bootstrap-icons";

export interface SearchBoxProps {
  initialTerm?: string;
  placeholder?: string;
  className?: string;
}

export function SearchBox({
  initialTerm = "",
  placeholder = "Search...",
  className,
}: SearchBoxProps) {
  const router = useRouter();
  const [input, setInput] = useState(initialTerm);
  const onSearch = () => {
    if (input === "") {
      return;
    }
    router.push(`/search/${input}`);
  };

  return (
    <div className={`flex gap-3 ${className}`}>
      <input
        onChange={(a) => setInput(a.target.value)}
        onKeyPress={(e) => (e.key === "Enter" ? onSearch() : null)}
        className={`border-2 border-secondary-100 focus:border-secondary-80 outline-none rounded-xl p-3 transition flex-grow`}
        placeholder={placeholder}
        defaultValue={initialTerm}
      />
      <button
        onClick={onSearch}
        className="bg-primary-100 hover:bg-primary-60 rounded-xl p-3 text-primary-white transition"
      >
        <Search className="inline-block" /> Search
      </button>
    </div>
  );
}
