import { useState, ChangeEvent, FormEvent } from "react";

import Input from "../../components/login/Input";

const RegisterStep2 = ({
  code,
  setCode,
  onSubmit,
}: {
  code: string;
  setCode: (code: string) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}) => {
  // const [number1, setNumber1] = useState<string>("");
  // const [number2, setNumber2] = useState<string>("");
  // const [number3, setNumber3] = useState<string>("");
  // const [number4, setNumber4] = useState<string>("");

  // const [numbers, setNumbers] = useState<string[]>(["", "", "", ""]);

  // const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
  //   const newNumbers = [...numbers];
  //   newNumbers[index] = e.target.value;
  //   setNumbers(newNumbers);
  // };

  return (
    <>
      <h2>Step 2 - verify your email</h2>
      <form onSubmit={onSubmit}>
        <Input
          type="text"
          placeholder="code"
          name="code"
          onChange={(e) => setCode(e.target.value)}
          value={code}
        />
        {/* {numbers.map((number, index) => (
          <Input
            key={index}
            type="text"
            name="code[]"
            onChange={(e) => handleChange(e, index)}
            value={number}
          />
        ))} */}
        <button type="submit">Next</button>
      </form>
    </>
  );
};

export default RegisterStep2;
