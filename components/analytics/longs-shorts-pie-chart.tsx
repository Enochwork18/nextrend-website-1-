"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface LongsShortsPieChartProps {
  longs: number;
  shorts: number;
}

const COLORS = ['hsl(var(--primary))', 'hsl(var(--muted))'];

export function LongsShortsPieChart({ longs, shorts }: LongsShortsPieChartProps) {
  const data = [
    { name: 'Long Views', value: longs },
    { name: 'Short Views', value: shorts },
  ];

  return (
    <div className="w-full max-w-[200px] h-[200px] mx-auto">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={40}
            outerRadius={60}
            paddingAngle={2}
            dataKey="value"
            startAngle={90}
            endAngle={-270}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{
              backgroundColor: 'hsl(var(--background))',
              borderColor: 'hsl(var(--border))',
              borderRadius: 'var(--radius)'
            }}
            formatter={(value: number, name: string) => [
              `${value.toLocaleString()}M`,
              name
            ]}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="flex justify-center gap-4 mt-2 text-sm">
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-primary mr-1"></div>
          <span>Longs</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-muted mr-1"></div>
          <span>Shorts</span>
        </div>
      </div>
    </div>
  );
}
