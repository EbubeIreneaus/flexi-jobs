"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { BoxSelectIcon, CheckCheck, CheckCheckIcon, CheckCircle, ChevronDown, Circle, CircleDot, Search } from "lucide-react";
import {
  SelectTrigger,
  SelectValue,
  Select,
  SelectGroup,
  SelectContent,
  SelectItem,
} from "./ui/select";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

type SearchComponentProps = {
  filter: any;
  onFilterChange: (
    newFilter:
      | "employment_types"
      | "date_posted"
      | "query"
      | "country"
      | "job_requirements",
    value: string
  ) => void;
  query: string,
  updateQuery : (str: string) => void
};

// const SearchComponentHorz = ({
//   filter,
//   onFilterChange,
// }: SearchComponentProps) => {
//   return (
//     <div className="p-5 my-5 bg-slate-200 hidden lg:block">
//       <div className="flex gap-x-3 flex-wrap items-center">
//         <p className="text-lg font-semibold">Find a Job</p>
//         <Select onValueChange={(val) => onFilterChange("employment_types", val)}>
//           <SelectTrigger className="max-w-[150px] bg-white w-full">
//             <SelectValue placeholder="Employment Type" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectGroup>

//             </SelectGroup>
//           </SelectContent>
//         </Select>

//         <Select onValueChange={(val) => onFilterChange("industry", val)}>
//           <SelectTrigger className="max-w-[200px] bg-white w-full">
//             <SelectValue placeholder="Industry" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectGroup>
//               <SelectItem value="developer">Developer</SelectItem>
//               <SelectItem value="designer">Designer</SelectItem>
//               <SelectItem value="manager">Manager</SelectItem>
//             </SelectGroup>
//           </SelectContent>
//         </Select>

//         <Select onValueChange={(val) => onFilterChange("experience", val)}>
//           <SelectTrigger className="max-w-[200px]  bg-white w-full">
//             <SelectValue placeholder="Work Experience" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectGroup>
//               <SelectItem value="developer">Developer</SelectItem>
//               <SelectItem value="designer">Designer</SelectItem>
//               <SelectItem value="manager">Manager</SelectItem>
//             </SelectGroup>
//           </SelectContent>
//         </Select>

//         <Select onValueChange={(val) => onFilterChange("location", val)}>
//           <SelectTrigger className="max-w-[200px] bg-white w-full">
//             <SelectValue placeholder="Location" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectGroup>
//               <SelectItem value="developer">Developer</SelectItem>
//               <SelectItem value="designer">Designer</SelectItem>
//               <SelectItem value="manager">Manager</SelectItem>
//             </SelectGroup>
//           </SelectContent>
//         </Select>

//         <Select>
//           <SelectTrigger className="max-w-[200px] w-full bg-white">
//             <SelectValue placeholder="Work Experience" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectGroup>
//               <SelectItem value="developer">Developer</SelectItem>
//               <SelectItem value="designer">Designer</SelectItem>
//               <SelectItem value="manager">Manager</SelectItem>
//             </SelectGroup>
//           </SelectContent>
//         </Select>

//         <Button className="bg-blue-600 text-white hover:bg-blue-700 max-w-[150px] w-full">
//           Filter
//         </Button>
//       </div>
//     </div>
//   );
// };

const SearchComponentVert = ({
  filter,
  onFilterChange,
}: SearchComponentProps) => {
  return (
    <div className="overflow-y-auto max-h-dvh ">
      <Card className="">
        <CardContent className="px-0">
          <div className="mb-4 px-3">
            <p className="text-xl font-medium mb-3 uppercase">Filter Result</p>
            <div>
              <div className="flex gap-x-3 items-center">
                <Input placeholder="Search jobs" />
                <Button>
                  <Search />
                </Button>
              </div>
            </div>
          </div>
          <div>
            <Accordion type="multiple">
              <AccordionItem
                value="function"
                className="border-t border-b-0 border-slate-950/10"
              >
                <AccordionTrigger className="hover:no-underline text-lg px-3">
                  Employment Type
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="px-5">
                    {emp_type.map((type) => (
                      <li key={type.value}>
                        <Button
                          variant="ghost"
                          className="w-full flex gap-x-5 justify-start"
                          onClick={() =>
                            onFilterChange("employment_types", type.value)
                          }
                        >
                          {filter.employment_types === type.value ? <CircleDot color="blue" /> : <Circle />} {type.label}
                        </Button>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="industry"
                className="border-t border-b-0 border-slate-950/10"
              >
                <AccordionTrigger className="hover:no-underline text-lg  px-3">
                  Industry
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="px-5">
                     {industries.map((q) => (
                      <li key={q.value}>
                        <Button
                          variant="ghost"
                          className="w-full flex gap-x-5 justify-start"
                          onClick={() => onFilterChange('query', q.value)}
                        >
                        {filter.query === q.value ? <CircleDot color="blue" /> : <Circle />} {q.label}
                      </Button>
                    </li>
                    ))
                  }
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="date"
                className="border-t border-b-0 border-slate-950/10"
              >
                <AccordionTrigger className="hover:no-underline text-lg  px-3">
                  Date Posted
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="px-5">
                     {dates.map((dt) => (
                      <li key={dt.value}>
                        <Button
                          variant="ghost"
                          className="w-full flex gap-x-5 justify-start"
                          onClick={() => onFilterChange('date_posted', dt.value)}
                        >
                        {filter.date_posted === dt.value ? <CircleDot color="blue" /> : <Circle />}  {dt.label}
                      </Button>
                    </li>
                    ))
                  }
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="country"
                className="border-t border-b-0 border-slate-950/10"
              >
                <AccordionTrigger className="hover:no-underline text-lg  px-3">
                  Country
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="px-5">
                    {countries.map((country) => (
                      <li key={country.value}>
                        <Button
                          variant="ghost"
                          className="w-full flex gap-x-5 justify-start"
                          onClick={() =>
                            onFilterChange("country", country.value)
                          }
                        >
                          {filter.country === country.value ? <CircleDot color="blue" /> : <Circle />} {country.label}
                        </Button>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="Experience"
                className="border-t border-b-0 border-slate-950/10  px-3"
              >
                <AccordionTrigger className="hover:no-underline text-lg">
                  Experience
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="px-5">
                    {requirements.map((r) => (
                      <li key={r.value}>
                        <Button
                          variant="ghost"
                          className="w-full flex gap-x-5 justify-start"
                          onClick={() =>
                            onFilterChange("job_requirements", r.value)
                          }
                        >
                          {filter.job_requirements === r.value ? <CircleDot color="blue" /> : <Circle />} {r.label}
                        </Button>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="px-3">
              <Button
                variant="outline"
                color="blue"
                className="w-full mt-5 border-blue-600 py-5 "
              >
                Filter
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export { SearchComponentVert };

const emp_type = [
  { label: "Full Time", value: "FULLTIME" },
  { label: "Part Time", value: "PARTTIME" },
  { label: "Contract", value: "CONTRACTOR" },
  { label: "Intern", value: "INTERN" },
];

const countries = [
  { label: "Nigeria", value: "ng" },
  { label: "Ghana", value: "gh" },
  { label: "South Africa", value: "za" },
  { label: "United States", value: "us" },
  { label: "Canada", value: "ca" },
  { label: "United Kingdom", value: "uk" },
  { label: "Australia", value: "au" },
];

const requirements = [
  {
    label: "Intern",
    value: "no_degree",
  },
  {
    label: "Entry",
    value: "no_experience",
  },
  {
    label: "Less than 3 years",
    value: "under_3_years_experience",
  },
  {
    label: "More than 3 years",
    value: "more_than_3_years_experience",
  },
];

const dates = [
  { label: "All", value: "all" },
  { label: "Today", value: "today" },
  { label: "3 days", value: "3days" },
  { label: "This Week", value: "week" },
  { label: "This Month", value: "month" },
];


 const industries = [
  { label: "Oil & Gas / Energy", value: "Oil & Gas and Energy" },
  { label: "Information Technology (IT) / Software", value: "Information Technology (IT) and Software" },
  { label: "Banking / Finance / Fintech", value: "Banking and Finance Fintech" },
  { label: "Agriculture / Agribusiness", value: "Agriculture and Agribusiness" },
  { label: "Telecommunications", value: "Telecommunications" },
  { label: "Manufacturing / Production", value: "Manufacturing and Production" },
  { label: "Construction / Real Estate", value: "Construction and Real Estate" },
  { label: "Healthcare / Pharmaceuticals", value: "Healthcare and Pharmaceuticals" },
  { label: "Education / Training", value: "Education and Training" },
  { label: "Logistics and Transportation", value: "Logistics and Transportation" }
];
