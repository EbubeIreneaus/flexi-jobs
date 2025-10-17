import React from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { SunDimIcon, UserCircle } from "lucide-react";
import { Job } from "@/types/job";
import { formatDistance } from "date-fns";
import Link from "next/link";
import slugify from "slugify";

type props = {
  job: Job;
};
const JobCard = ({ job }: props) => {
  function formatMoney(amount: number | null) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumIntegerDigits: 1,
    }).format(amount || 0);
  }
  return (
    <div>
      <Card className="py-0 pt-5">
        <CardContent className="px-0 my-0 ">
          <div className="px-5 mb-3">
            <h2 className="text-lg font-bold text-primary mb-2">
              <Link href={`/job/${slugify(job.job_title)}?id=${job.job_id}`}>{job.job_title}</Link>
            </h2>
            <p className="text-base mb-3">{job.employer_name}</p>
            <div className="flex flex-wrap  gap-3 mb-3">
              <p className="border px-4 py-1 rounded-sm bg-slate-200">
                {" "}
                {job.job_location}{" "}
              </p>
              <p className="border px-4 py-1 rounded-sm bg-slate-200">
                {" "}
                {job.job_employment_type || "Full Time"}{" "}
              </p>
              <p className="border px-4 py-1 rounded-sm bg-slate-200">
                {formatMoney(job.job_min_salary)} / {job.job_salary_period}
              </p>
            </div>
            <p className="text-base text-green-800-800 uppercase font-extrabold">
              {job.job_is_remote ? "Remote" : "Onsite"  }
            </p>
          </div>

          <div className="flex justify-between items-center py-3 border border-l-0 border-r-0 px-5 mb-4">
            <Badge
              variant="secondary"
              style={{ fontSize: ".9rem" }}
              className="bg-blue-300/30 text-blue-600"
            >
              New
              <SunDimIcon />
            </Badge>

            <p className="">{job.job_posted_at}</p>
          </div>
          <div className="px-5 mb-4">
            <p className="text-sm line-clamp-3 text-ellipsis">
              {job.job_description}
            </p>
          </div>
          <div className="px-5 py-3 rounded-bl-lg rounded-br-lg bg-blue-500">
            <div className="flex gap-x-3">
              <UserCircle className="text-blue-100" />
              <p className="text-blue-100">Easy Apply</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default JobCard;
