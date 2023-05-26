import React, { useState } from "react";

export const WavenumberCalcForm = () => {
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");
  const [value3, setValue3] = useState("");
  const [value4, setValue4] = useState("");
  const [sum, setSum] = useState("");
  const [array, setArray] = useState([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch("/wavenumber_calculation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ value1, value2, value3, value4 }),
      });
      
      if (!response.ok) {
        throw new Error("Calculation failed.");
      }
      
      const data = await response.json();
      setSum(data.sum);
      setArray(data.arr);

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          value={value1}
          onChange={(e) => setValue1(e.target.value)}
        />
        <input
          type="number"
          value={value2}
          onChange={(e) => setValue2(e.target.value)}
        />
        <input
          type="number"
          value={value3}
          onChange={(e) => setValue3(e.target.value)}
        />
        <input
          type="text"
          value={value4}
          onChange={(e) => setValue4(e.target.value)}
        />
        <button type="submit">Calculate</button>
      </form>
      {sum && <p>Result: {sum}</p>}
      {array && <p>Array: {array}</p>}
    </div>
  );
};

