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
  id: string;
  title: string;
  instructions: string;
  opensAt: Date;
  closesAt: Date;
  reward: number;
  allowedLanguages: string[];
  memoryLimit: number;
  timeLimit: number;
  tests: CodeTest[];
  solutions: Solution[];
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
  commnet: string;
  credits: number;
};

export type CodeTest = {
  language: string;
  taskId: number;
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
