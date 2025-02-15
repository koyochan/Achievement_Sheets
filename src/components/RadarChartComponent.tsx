import React from "react";
import { RadarChart, PolarAngleAxis, PolarGrid, Radar, ResponsiveContainer, PolarRadiusAxis } from "recharts";

interface RadarChartComponentProps {
  data: { skill: string; value: number }[];
}

export const RadarChartComponent: React.FC<RadarChartComponentProps> = ({ data }) => {
  return (
    <div className="w-full max-w-lg mx-auto" style={{ height: "400px" }}>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data}>
          <PolarGrid stroke="#e2e8f0" />
          <PolarAngleAxis dataKey="skill" tick={{ fill: "#4a5568" }} />
          <PolarRadiusAxis domain={[0, 5]} tick={{ fill: "#4a5568" }} axisLine={false} tickFormatter={() => ""} tickCount={6} />
          <Radar dataKey="value" stroke="#2d3748" fill="#2d3748" fillOpacity={0.6} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RadarChartComponent;