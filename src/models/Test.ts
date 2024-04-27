import TestCase from "./TestCase";

class Test {
    constructor(
        public language: string,
        public testFileBase64: string,
        public testCases: TestCase[]
    ) {}
}

export default Test;
