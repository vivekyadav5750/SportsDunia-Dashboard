"use client";
import { useEffect, useState } from "react";
import { fetchNews } from "@/redux/reducer";
import { RootState } from "@/redux/store";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import ArticlesList from "./components/ArticlesList";
import Filters from "./components/Filters";

export type DateRange = {
  start: string;
  end: string;
};

export default function DashboardPage() {
  const dispatch = useAppDispatch();
  const { articles, loading, error } = useAppSelector(
    (state: RootState) => state.news
  );

  const [filteredArticles, setFilteredArticles] = useState(articles);
  const [author, setAuthor] = useState("");
  const [dateRange, setDateRange] = useState<DateRange>({ start: "", end: "" });
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(fetchNews("sports"));
  }, [dispatch]);

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
    <div className="p-4 md:p-8">
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

      {/* Articles List */}
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <ArticlesList articles={filteredArticles} />
    </div>
  );
}
