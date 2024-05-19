export type User = {
  id: string;
  username: string;
  email: string;
  credits: number;
  description: string;
  imageBase64: string;
  role: string;
};

export type Task = {
  id?: string;
  title: string;
  instructions: string;
  opensAt: string;
  closesAt: string;
  reward: number;
  allowedLanguages: string[];
  memoryLimit?: number;
  timeLimit?: string;
  tests?: CodeTest[];
  solutions?: Solution[];
};

export type Solution = {
  id: string;
  task: Task;
  submitDate: Date;
  user: User;
  files: string[];
  feedback: Feedback;
};

export type Social = {
  id_social_user: string;
  social_media_name: string;
  social_media_link: string;
  id_user: string;
  id_icon: string;
  url: string;
};

export type Reward = {
  id: string;
  name: string;
  description: string;
  cost: number;
  imageBase64: string;
};

export type TestCase = {
  name: string;
  input: string;
  status: boolean;
  expectedOutput: string;
};

export type PurchasedReward = {
  reward: Reward;
  datePurchase: Date;
};

export type Feedback = {
  id: string;
  solition: Solution;
  files: string[];
  comment: string;
  credits: number;
};

export type CodeTest = {
  language: string;
  taskId?: number;
  testFileBase64: string;
  testCases: TestCase[];
};

export enum Experience {
  INTERN = "INTERN",
  JUNIOR = "JUNIOR",
  REGULAR = "REGULAR",
  SENIOR = "SENIOR",
  EXPERT = "EXPERT",
}

export enum EmploymentType {
  STATIONARY = "STATIONARY",
  REMOTE = "REMOTE",
  MIXED = "MIXED",
}

export enum AllowedLanguages {
  KOTLIN = "KOTLIN",
  JAVA = "JAVA",
  CPP = "CPP",
  TYPESCRIPT = "TYPESCRIPT",
  GO = "GO",
  PYTHON = "PYTHON",
  JAVASCRIPT = "JAVASCRIPT",
  PHP = "PHP",
}

export type JobOffer = {
  id?: string;
  jobTitle: string;
  description: string;
  requiredSkills: string[];
  preferredSkills: string[];
  workLocations: string[];
  technologies: string[];
  experience: Experience;
  task: Task;
  user: User;
  salary: number;
  employmentType: EmploymentType;
  tests?: CodeTest[];
};
