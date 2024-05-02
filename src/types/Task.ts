import CodeTest from "./CodeTest";
import Solution from "./Solution";

type User = {
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

export default User;
