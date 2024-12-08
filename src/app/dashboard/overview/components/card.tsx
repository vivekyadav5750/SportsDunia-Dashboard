import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Article } from "@/types";
import React from "react";

export default function Overview_Card({
  totalArticles,
  totalPayout,
  articles
}: {
  totalArticles: number;
  totalPayout: number;
  articles: Article[];
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <Card>
        <CardHeader>
          <CardTitle>Filtered Total Articles</CardTitle>
          <CardDescription>Count of all filtered articles/blogs.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{totalArticles}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Total Payout</CardTitle>
          <CardDescription>
            Sum of all payouts for filtered articles.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">${totalPayout.toFixed(2)}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Initial Total Articles</CardTitle>
          <CardDescription>
            Overview of total articles/blogs fetched from the API.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{articles.length}</p>
        </CardContent>
      </Card>
    </div>
  );
}
