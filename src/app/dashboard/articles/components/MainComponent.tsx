"use client";
import React, { useEffect, useState } from "react";
import Filters from "./Filters";
import ArticlesList from "./ArticlesList";
import { Article } from "@/types";

export type DateRange = {
  start: string;
  end: string;
};

export default function MainComponent({ articles }: { articles: Article[] }) {
  const [filteredArticles, setFilteredArticles] = useState(articles);
  const [author, setAuthor] = useState("");
  const [dateRange, setDateRange] = useState<DateRange>({ start: "", end: "" });
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    let updatedArticles = articles;
    updatedArticles = updatedArticles.filter((article) => article.author);

    if (author) {
      updatedArticles = updatedArticles.filter((article) =>
        article.author?.toLowerCase().includes(author.toLowerCase())
      );
    }

    if (dateRange.start && dateRange.end) {
      updatedArticles = updatedArticles.filter((article) => {
        const publishedDate = new Date(article.publishedAt);
        const startDate = new Date(dateRange.start);
        const endDate = new Date(dateRange.end);
        return publishedDate >= startDate && publishedDate <= endDate;
      });
    }

    if (searchQuery) {
      updatedArticles = updatedArticles.filter((article) =>
        article.title?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredArticles(updatedArticles);
  }, [articles, author, dateRange, searchQuery]);

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Sports News</h1>

      {/* Filters Section */}
      <Filters
        author={author}
        setAuthor={setAuthor}
        dateRange={dateRange}
        setDateRange={setDateRange}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <ArticlesList articles={filteredArticles} />
    </>
  );
}
