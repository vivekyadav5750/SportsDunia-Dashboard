"use client";
import ExportToCSV from "@/components/exports/ExportToCSV";
import ExportToPDF from "@/components/exports/ExportToPDF";
import React, { useState } from "react";
import Overview_Card from "./card";
import Filters from "./filters";
import { BarGraph } from "./BarGraph";
import { Article } from "@/types";

export interface Type_Filters {
  author: string;
  startDate: string;
  endDate: string;
}

export default function Main({ articles }: { articles: Article[] }) {
  const [filters, setFilters] = useState<Type_Filters>({
    author: "",
    startDate: "",
    endDate: ""
  });

  const payouts = JSON.parse(localStorage.getItem("payouts") || "{}");

  const filteredArticles = articles.filter((article) => {
    const { author, publishedAt } = article;
    const { author: filterAuthor, startDate, endDate } = filters;

    // Filter by author
    if (
      filterAuthor &&
      !author?.toLowerCase().includes(filterAuthor.toLowerCase())
    ) {
      return false;
    }

    // Filter by date range
    const articleDate = new Date(publishedAt);
    if (startDate && articleDate < new Date(startDate)) {
      return false;
    }
    if (endDate && articleDate > new Date(endDate)) {
      return false;
    }

    return true;
  });

  const totalArticles = filteredArticles.length;

  const totalPayout = filteredArticles.reduce((acc, article) => {
    return acc + (payouts[article.url] || 0);
  }, 0);

  const chartData = filteredArticles
    .map((article) => ({
      title: article.title,
      payout: payouts[article.url] || 0
    }))
    .filter((item) => item.payout > 0); // Only show articles with payouts

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const exportData = filteredArticles.map((article) => ({
    Title: article.title,
    Author: article.author || "Unknown",
    PublishedAt: article.publishedAt
  }));
  return (
    <>
      <div className="mb-4 md:mb-0 flex flex-col sm:flex-row justify-between items-center sm:items-start sm:space-x-6">
        <h1 className="text-3xl font-bold mb-6"> Dashboard</h1>

        <div className="flex flex-wrap gap-4 sm:gap-6">
          <ExportToCSV data={exportData} />
          <ExportToPDF data={exportData} />
        </div>
      </div>

      {/* Overview Section */}
      <Overview_Card
        totalArticles={totalArticles}
        totalPayout={totalPayout}
        articles={articles}
      />

      {/* Filters */}
      <Filters filters={filters} handleFilterChange={handleFilterChange} />

      {/* Bar Graph */}
      <BarGraph
        data={chartData}
        description="Payout distribution across filtered articles"
      />
    </>
  );
}
