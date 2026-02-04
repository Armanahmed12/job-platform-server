export interface ISalaryRange {
  min: number;
  max: number;
  currency:  "BDT" | "USD" | "INR";
}

export type JobStatus = 'active' | 'inactive' | 'closed' | 'draft';

export interface IJob {
  title: string;
  location: string;
  jobType: 'Full-time' | 'Part-time' | 'Intern';
  category: string;
  applicationDeadline: Date;
  salaryRange: ISalaryRange;
  description: string;
  company: string;
  requirements: string[];
  responsibilities: string[];
  status?: JobStatus;
  hr_email: string;
  hr_name: string;
  company_logo: string;
}
