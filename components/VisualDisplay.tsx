"use client";
import React, { use, useEffect, useRef, useState } from "react";
import { SearchComponentVert } from "./FilterComponent";
import JobCard from "./JobCard";
import { Job } from "@/types/job";
import { ClosedCaptionIcon, FilterIcon, LoaderIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { DialogClose } from "@radix-ui/react-dialog";

type VisualDisplayProps = {
  initialData: Job[];
};

const VisualDisplay = ({ initialData }: VisualDisplayProps) => {
  const [data, setData] = useState<Job[]>(initialData);
  const [pageNum, setPageNum] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const throttleRef = useRef(false);
  const [query, setQuery] = useState("");

  const [filter, setFilter] = useState({
    employment_types: "",
    date_posted: "",
    country: "",
    job_requirements: "",
    query: "jobs",
  });

  const handleFilterChange = (
    newFilter: keyof typeof filter,
    value: string
  ) => {
    setFilter((prev) => ({ ...prev, [newFilter]: value }));
  };

  async function FetchData() {
    try {
      setIsLoading(true);
      const res = await fetch(
        `https://jsearch.p.rapidapi.com/search?query=jobs&page=${pageNum + 1}`,
        {
          method: "GET",
          headers: {
            "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RapidApiKey as string,
            "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
          },
        }
      );

      const data = await res.json();
      setData((prev) => [...prev, ...data?.data]);
      setPageNum((prev) => prev + 1);
    } catch (error) {
    } finally {
      setIsLoading(false);
      throttleRef.current = false;
    }
  }

  function handleScroll() {
    if (throttleRef.current || isLoading) return;
    throttleRef.current = false;
    const scrollPosition = window.innerHeight + window.scrollY;
    const threshold = document.body.offsetHeight - 200;
    if (scrollPosition >= threshold) {
      FetchData();
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading]);

  return (
    <>
      <div className="py-7 lg:hidden">
        <Dialog>
          <DialogTrigger className=" block w-full px-4" asChild>
            <div>
              <Button className="w-full rounded-none bg-blue-700 " size="lg">
                <FilterIcon /> Filter
              </Button>
            </div>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Filter Job Search</DialogTitle>
            </DialogHeader>

            <div className="mt-5">
              <SearchComponentVert
                filter={filter}
                onFilterChange={handleFilterChange}
                query={query}
                updateQuery={setQuery}
              />
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex gap-x-5 px-4 lg:px-10 mt-5">
        <div className="w-full">
          <div className="flex justify-between container font-semibold mb-10">
            <h1 className="text-3xl">Jobs For You</h1>
            <p className="text-lg">500</p>
          </div>

          <div className="flex flex-col gap-y-5">
            {data?.map((job: Job) => (
              <JobCard key={job.job_id} job={job} />
            ))}

            <div className="flex justify-center items-center mt-5 mb-5">
              {isLoading && <LoaderIcon className="animate-spin" size={35} />}
            </div>
          </div>
        </div>

        <div className="max-w-sm w-full hidden lg:block">
          <div className="sticky top-0">
            <SearchComponentVert
              filter={filter}
              onFilterChange={handleFilterChange}
              query={query}
              updateQuery={setQuery}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default VisualDisplay;
