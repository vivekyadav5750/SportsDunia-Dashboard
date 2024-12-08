// components/AuthorPieChart.tsx

"use client";

import { Article } from "@/types";
import React, { useMemo } from "react";
import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  Legend,
  ResponsiveContainer
} from "recharts";

const AuthorPieChart = ({ articles }: { articles: Article[] }) => {
  const authorData = useMemo(() => {
    const authorMap: Record<string, number> = {};
    articles.forEach((article) => {
      const author = article.author || "Unknown Author";
      authorMap[author] = (authorMap[author] || 0) + 1;
    });

    const sortedAuthors = Object.entries(authorMap).sort((a, b) => b[1] - a[1]);
    const topAuthors = sortedAuthors.slice(0, 10);
    const othersCount = sortedAuthors
      .slice(10)
      .reduce((sum, [, count]) => sum + count, 0);

    const result = topAuthors.map(([author, count]) => ({
      name: author,
      value: count
    }));

    if (othersCount > 0) {
      result.push({ name: "Others", value: othersCount });
    }

    return result;
  }, [articles]);

  const colors = [
    "#8884d8",
    "#82ca9d",
    "#ffc658",
    "#d45087",
    "#4daf4a",
    "#FF8042",
    "#00C49F",
    "#FFBB28",
    "#0088FE",
    "#FF6361",
    "#BDB76B"
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={authorData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          label={({ name, value }) => `${name}: ${value}`}
        >
          {authorData.map((_, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend verticalAlign="bottom" height={36} />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default AuthorPieChart;
