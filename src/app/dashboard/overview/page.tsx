"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { fetchNews } from "@/redux/reducer";
import { BarGraph } from "../overview/components/BarGraph";
import Overview_Card from "./components/card";
import Filters from "./components/filters";
import ExportToCSV from "@/components/exports/ExportToCSV";
import ExportToPDF from "@/components/exports/ExportToPDF";

export interface Type_Filters {
  author: string;
  startDate: string;
  endDate: string;
}

const DashboardPage = () => {
  const dispatch = useAppDispatch();
  const { articles,loading, error } = useAppSelector((state: RootState) => state.news);

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

  useEffect(() => {
    dispatch(fetchNews("sports"));
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-50 p-6 text-gray-900">
      <div className="mb-4 md:mb-0 flex flex-col sm:flex-row justify-between items-center sm:items-start sm:space-x-6">
        <h1 className="text-3xl font-bold mb-6"> Dashboard</h1>

        <div className="flex flex-wrap gap-4 sm:gap-6">
          <ExportToCSV data={exportData} />
          <ExportToPDF data={exportData} />
        </div>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500 text-2xl my-4">{error}</p>}

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
    </div>
  );
};

export default DashboardPage;
