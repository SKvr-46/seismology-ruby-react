import React, { useState } from "react";

export const WavenumberCalcForm = () => {
  const [row, setRow] = useState("");
  const [column, setColumn] = useState("");
  const [dx, setDx] = useState("");
  const [dy, setDy] = useState("");
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
        body: JSON.stringify({ row, column, slipDistribution, dx, dy }),
      });
      
      if (!response.ok) {
        throw new Error("Calculation failed.");
      }
      
      const data = await response.json();
      setResult(data.result)
      console.log(data.row, data.column, data.slipDistribution, data.dx, data.dy)
      console.log(data.result)
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <label>
          ROW
          <input
            type="number"
            value={row}
            onChange={(e) => setRow(e.target.value)}
          />
        </label>
        <label>
          COLUMN
          <input
            type="number"
            value={column}
            onChange={(e) => setColumn(e.target.value)}
          />
        </label>
        <label>
          DX
          <input
            type="number"
            value={dx}
            onChange={(e) => setDx(e.target.value)}
          />
        </label>
        <label>
          DY
          <input
            type="number"
            value={dy}
            onChange={(e) => setDy(e.target.value)}
          />
        </label>
        <label>
          SlIP_DISTRIBUTION
          <input
            type="text"
            value={slipDistribution}
            onChange={(e) => setSlipDistribution(e.target.value)}
          />
        </label>
        <button type="submit">Calculate</button>
      </form>
      {result && <p>Result: {result}</p>}
    </div>
  );
};

