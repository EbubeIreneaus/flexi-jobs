import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Job } from "@/types/job";
import { BadgeInfoIcon } from "lucide-react";
import React from "react";

const JOBDetails = async ({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) => {
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const jobId = resolvedSearchParams?.id
  const res = await fetch(
    `https://jsearch.p.rapidapi.com/job-details?job_id=${jobId}`,
    {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": process.env.RapidApiKey as string,
        "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
      },
    }
  ).then((res) => res.json());

  const job: Job = res?.data[0];

  return (
    <div className="max-w-5xl w-full px-5 py-10">
      <Card>
        <CardContent className="px-0">
          <div>
            <div className="flex justify-between pb-3 px-5 border-b border-primary/20">
              <Badge
                variant="secondary"
                style={{ fontSize: ".9rem" }}
                className="bg-blue-300/30 text-blue-600"
              >
                New
                <BadgeInfoIcon />
              </Badge>

              <div>{job.job_posted_at}</div>
            </div>

            <div className="py-7 flex flex-col lg:flex-row lg:items-center gap-5 px-5 border-b border-primary/20">
              <div>
                <img
                  src={job.employer_logo || ""}
                  alt="company logo"
                  width={200}
                  height={200}
                  className="w-[150px] rounded-sm"
                />
              </div>
              <div>
                <h1 className="text-lg mb-3">{job.job_title}</h1>
                <p className="mb-2 text-primary/60"> {job.employer_name} </p>
                <p className="mb-4 text-primary/60">{job.job_location}</p>
                <div className="flex flex-wrap  gap-3 mb-3">
                  <p className="border px-4 py-1 rounded-sm bg-slate-200">
                    {job.job_country}
                  </p>
                  <p className="border px-4 py-1 rounded-sm bg-slate-200">
                    {job.job_employment_type || "Full Time"}
                  </p>
                  <p className="border px-4 py-1 rounded-sm bg-slate-200">
                    {formatMoney(job.job_min_salary)} / {job.job_salary_period}
                  </p>
                </div>
              </div>
            </div>

            <div className="py-7 px-5 border-b border-primary/30">
              <div>
                <h2 className="text-lg mb-3">Job Summary</h2>
                <p className="text-primary/70 mb-5 text-sm line-clamp-6 ">
                  {job.job_description}
                </p>

                <ul className="*:grid *:grid-cols-2 *:gap-x-7 *:mb-3 max-w-md *:list-decimal *:list-outside">
                  <li>
                    <span className="font-bold">Minimum Requirement:</span>{" "}
                    {job.job_employment_type}
                  </li>
                  <li>
                    <span className="font-bold">Experience Level:</span> Any
                  </li>
                  <li>
                    <span className="font-bold">Job Type:</span>{" "}
                    {job.job_is_remote ? "Remote" : "Onsite"}
                  </li>
                </ul>
              </div>
            </div>

            <div className="py-5 px-5 border-b border-primary/30">
              <h2 className="text-lg font-semibold mb-5">
                Job Description and Responsibility
              </h2>

              <div className="mb-8">
                <h3 className="font-bold mb-3 text-black/50">
                  Responsibilities
                </h3>
                <ul className="px-5 list-disc">
                  {job.job_highlights?.Responsibilities?.map(
                    (responsibility, index) => (
                      <li key={index} className="text-sm mb-2.5">
                        {responsibility}
                      </li>
                    )
                  )}
                </ul>
              </div>

              <div className="mb-4">
                <h3 className="font-bold mb-3 text-black/50">Requirements</h3>
                <ul className="px-5 list-disc">
                  {job.job_highlights?.Qualifications?.map(
                    (qualification, index) => (
                      <li key={index} className="text-sm mb-2.5">
                        {qualification}
                      </li>
                    )
                  )}
                </ul>
              </div>

              <div>
                <h3 className="font-bold mb-3 text-black/50">
                  Remuneration:{" "}
                  <span>
                    {formatMoney(job.job_min_salary)} / {job.job_salary_period}
                  </span>
                </h3>
                <h3 className="font-bold mb-3 text-black/50">
                  Location:{" "}
                  <span>
                    {job.job_location} {job.job_state}, {job.job_country}
                  </span>
                </h3>
              </div>
            </div>

            <div className="py-5 px-5 border-b border-primary/30">
              <h3 className="text-lg font-semibold mb-4">
                Important Safety and Tips
              </h3>
              <ul className="list-disc list-outside px-5 mt-3 space-y-2 text-primary/80 mb-5">
                <li>
                  Do not make any payment without confirming with the Jobberman
                  Customer Support Team.
                </li>
                <li>
                  If you think this advert is not genuine, please report it via
                  the Report Job link below.
                </li>
              </ul>

              <Button
                size="lg"
                variant="outline"
                className="border-blue-500 px-10 py-6 font-bold"
              >
                Report Job
              </Button>
            </div>

            <div className="pt-5 px-5">
              <Button className="w-full py-6">Apply Now</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default JOBDetails;

function formatMoney(amount: number | null) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumIntegerDigits: 1,
  }).format(amount || 0);
}
