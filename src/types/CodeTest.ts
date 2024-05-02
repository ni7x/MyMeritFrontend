import TestCase from "./TestCase";

type CodeTest = {
  language: string;
  taskId: number;
  testFileBase64: string;
  testCases: TestCase[];
};

export default CodeTest;
