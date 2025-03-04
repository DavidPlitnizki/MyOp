"use client";

import useGetTickets from "@/hooks/useGetTickets";
import useManageLayout from "@/hooks/useManageLayout";
import { UserType, userTypes } from "@/types";
import Search from "@/widgets/Search";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";

const isUserTypeValidUrl = (search: string): UserType => {
  const user = userTypes.includes(search as UserType) ? search : "local";
  return user as UserType;
};

export default function Home() {
  const [page, setPage] = useState(0);
  const [tickets, setTickets] = useState([]);
  const [filterTickets, setFilterTickets] = useState("");
  const searchParams = useSearchParams();
  const search = searchParams?.get("userType");
  const userType = isUserTypeValidUrl(search ?? "");
  const { getComponent } = useManageLayout(userType);
  const { data, getData, isError, isPending } = useGetTickets();
  const scrollableRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    getData({ userType, page, filterTickets });
  }, [filterTickets, getData, page, userType]);

  useEffect(() => {
    if (data) {
      setTickets((prev) => [...prev, ...data.tickets]);
    }
  }, [data]);

  useEffect(() => {
    setPage(0);
    setTickets([]);
  }, [filterTickets]);

  const handleScroll = () => {
    if (scrollableRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollableRef.current;
      if (
        scrollHeight - scrollTop === clientHeight &&
        (page + 1) * 10 <= data.maxLength
      ) {
        setPage((prev) => prev + 1);
      }
    }
  };

  if (isError) return <div>SOMETHING WRONG, TRY AGAIN TO GET DATA!!!</div>;

  const Component = getComponent();

  return (
    <div data-testid="page-container">
      <div className="flex justify-center m-4" data-testid="search">
        <Search onFilterData={setFilterTickets} />
      </div>
      <div
        className="h-132 mt-16 border overflow-auto"
        ref={scrollableRef}
        onScroll={handleScroll}
      >
        {isPending ? (
          <div className="flex justify-center items-center absolute w-full h-full top-0 left-0 opacity-80 pointer-events-none ">
            LOADING DATA
          </div>
        ) : null}
        <Suspense fallback={<p>Loading Components...</p>}>
          <Component data={tickets} />
        </Suspense>
      </div>
    </div>
  );
}
