export interface Job {
  apply_options: ApplyOption[];
  employer_logo: string | null;
  employer_name: string;
  employer_website: string | null;
  job_apply_is_direct: boolean;
  job_apply_link: string;
  job_benefits: string[] | null;
  job_city: string | null;
  job_country: string;
  job_description: string;
  job_employment_type: string; // e.g., "Full-time"
  job_employment_types: string[]; // e.g., ['FULLTIME']
  job_google_link: string;
  job_highlights: JobHighlights;
  job_id: string;
  job_is_remote: boolean;
  job_latitude: number | null;
  job_longitude: number | null;
  job_location: string; // e.g., "Washington, DC"
  job_min_salary: number | null;
  job_max_salary: number | null;
  job_salary_period: string | null; // e.g., "YEAR"
  job_title: string;
  job_publisher: string;
  job_posted_at: string; // human readable date e.g. "1 day ago"
  job_posted_at_datetime_utc: string; // e.g. "2025-10-16T00:00:00.000Z"
  job_posted_at_timestamp: number;
  job_state: string | null;
  job_onet_soc: string | null;
  job_onet_job_zone: string | null;
  job_category?: string; // optional custom field
  job_function?: string; // optional custom field
}

export interface ApplyOption {
  apply_link: string;
  apply_type: string; // e.g., "External" or "LinkedIn"
}

export interface JobHighlights {
  Qualifications?: string[];
  Benefits?: string[];
  Responsibilities?: string[];
}
