"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { fetchNews } from "@/redux/reducer";
import { BarGraph } from "../overview/components/BarGraph";
import Overview_Card from "./components/card";
import Filters from "./components/filters";

export interface Type_Filters {
  author: string;
  startDate: string;
  endDate: string;
}

const DashboardPage = () => {
  const dispatch = useAppDispatch();
  const { articles } = useAppSelector((state: RootState) => state.news);

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

  useEffect(() => {
    dispatch(fetchNews("sports"));
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-50 p-6 text-gray-900">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

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
