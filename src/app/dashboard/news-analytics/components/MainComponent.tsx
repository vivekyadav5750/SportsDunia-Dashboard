"use client"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import AuthorPieChart from "./AuthorPieChart";
import ContentPieChart from "./ContentPieChart";
import { Article } from "@/types";

export default function MainComponent({ articles }: { articles: Article[] }) {
  return (
    <>
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
    </>
  );
}
