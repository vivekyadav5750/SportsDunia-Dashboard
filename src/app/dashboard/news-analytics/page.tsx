// pages/NewsAnalytics.tsx

"use client";

import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchNews } from "@/redux/reducer";
import AuthorPieChart from "./components/AuthorPieChart";
import ContentPieChart from "./components/ContentPieChart";

const NewsAnalytics = () => {
  const dispatch = useAppDispatch();
  const { articles, loading, error } = useAppSelector((state) => state.news);

  useEffect(() => {
    dispatch(fetchNews("sports"));
  }, [dispatch]);

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 text-2xl my-4">Error: {error}</p>;
  }

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold mb-6">News Analytics</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Author Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Articles by Author</CardTitle>
            <CardDescription>
              Distribution of articles by top authors.
            </CardDescription>
          </CardHeader>
          <CardContent className="mb-40 md:mb-0">
            <AuthorPieChart articles={articles} />
          </CardContent>
        </Card>

        {/* Content Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Articles by Author</CardTitle>
            <CardDescription>
              Distribution of articles by authors.
            </CardDescription>
          </CardHeader>
          <CardContent className="-ml-20 md:ml-0">
            <ContentPieChart articles={articles} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NewsAnalytics;
