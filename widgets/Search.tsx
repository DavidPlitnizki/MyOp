import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface IProps {
  onFilterData: Dispatch<SetStateAction<string>>;
}

const Search = ({ onFilterData }: IProps) => {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(handler);
  }, [search]);

  useEffect(() => {
    if (debouncedSearch) {
      onFilterData(search);
    }
  }, [debouncedSearch, onFilterData, search]);

  return (
    <div className="flex border py-2 px-4 rounded-2xl shadow-2xl">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search..."
      />
    </div>
  );
};

export default Search;
