// pages/NewsAnalytics.tsx

"use client";

import React, { useMemo } from "react";
import { Pie, PieChart, Tooltip } from "recharts";
import { Article } from "@/types";

export default function ContentPieChart({ articles }: { articles: Article[] }) {
  // Data Transformation for Charts
  const authorData = useMemo(() => {
    const authorMap: Record<string, number> = {};
    articles.forEach((article) => {
      const author = article.author || "Unknown Author";
      authorMap[author] = (authorMap[author] || 0) + 1;
    });

    return Object.entries(authorMap).map(([author, count]) => ({
      name: author,
      value: count
    }));
  }, [articles]);

  return (
    <PieChart width={400} height={400}>
      <Pie
        data={authorData}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={100}
        fill="#8884d8"
        label
      />
      <Tooltip />
    </PieChart>
  );
}
