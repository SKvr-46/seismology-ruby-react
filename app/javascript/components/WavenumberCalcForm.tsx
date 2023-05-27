import React, { useState } from "react";

export const WavenumberCalcForm = () => {
  const [row, setRow] = useState("");
  const [column, setColumn] = useState("");
  const [slipDistribution, setSlipDistribution] = useState("");
  const [result, setResult] = useState([])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch("/wavenumber_calculation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ row, column, slipDistribution }),
      });
      
      if (!response.ok) {
        throw new Error("Calculation failed.");
      }
      
      const data = await response.json();
      setResult(data.result)
      console.log(data.row, data.column, data.slipDistribution)
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          value={row}
          onChange={(e) => setRow(e.target.value)}
        />
        <input
          type="number"
          value={column}
          onChange={(e) => setColumn(e.target.value)}
        />
        <input
          type="text"
          value={slipDistribution}
          onChange={(e) => setSlipDistribution(e.target.value)}
        />
        <button type="submit">Calculate</button>
      </form>
      {result && <p>Result: {result}</p>}
    </div>
  );
};

