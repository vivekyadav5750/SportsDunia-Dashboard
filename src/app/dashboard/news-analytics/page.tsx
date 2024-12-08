// pages/NewsAnalytics.tsx

'use client';

import React, { useEffect, useMemo } from 'react';
import { Bar, BarChart, CartesianGrid, Pie, PieChart, Tooltip, XAxis, YAxis, Legend } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchNews } from '@/redux/reducer';

const NewsAnalytics = () => {
  const dispatch = useAppDispatch();
  const { articles, loading, error } = useAppSelector((state) => state.news);

  useEffect(() => {
    dispatch(fetchNews('sports'));
  }, [dispatch]);

  // Data Transformation for Charts
  const authorData = useMemo(() => {
    const authorMap: Record<string, number> = {};
    articles.forEach((article) => {
      const author = article.author || 'Unknown Author';
      authorMap[author] = (authorMap[author] || 0) + 1;
    });

    return Object.entries(authorMap).map(([author, count]) => ({
      name: author,
      value: count,
    }));
  }, [articles]);

  const typeData = useMemo(() => {
    return articles.map((article) => ({
      name: article.title,
      value: article.content.length,
    }));
  }, [articles]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching news: {error}</p>;
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
              Distribution of articles by authors.
            </CardDescription>
          </CardHeader>
          <CardContent>
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
          </CardContent>
        </Card>

        {/* Content Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Article Trends</CardTitle>
            <CardDescription>
              Number of articles published by content type.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <BarChart width={500} height={300} data={typeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" tick={{ fontSize: 10 }} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#82ca9d" />
            </BarChart>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NewsAnalytics;
