import React, { useState } from "react";
import { GeneratedImageDisplay } from "./GeneratedImageDisplay";
import Figure from "../images/figure.png"
import SpectrumPlot from "../images/spectrum_plot.png"

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
      console.log("slip_distribution", data.slipDistribution)
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
          SLIP_DISTRIBUTION
          <input
            type="text"
            value={slipDistribution}
            onChange={(e) => setSlipDistribution(e.target.value)}
          />
        </label>
        <button type="submit">CALCULATE</button>
      </form>
      <div>
        <details>
          <summary>各変数情報</summary>
          <p>ROW：滑り分布の行数および縦方向のサンプリング数</p>
          <p>COLUMN：滑り分布の列数および横方向のサンプリング数</p>
          <p>DX：グリッドの横の長さ</p>
          <p>DY：グリッドの縦の長さ</p>
          <p>SLIP_DISTRIBUTION：滑り分布</p>
        </details>
      </div>
    <GeneratedImageDisplay imgUrl={Figure}/>
    <GeneratedImageDisplay imgUrl={SpectrumPlot}/>
    </div>
  );
};

