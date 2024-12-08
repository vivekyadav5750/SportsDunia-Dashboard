"use client";

import * as React from "react";
import { BarChart, Bar, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface BarGraphProps {
  data: { title: string; payout: number }[];
  description: string;
}

export const BarGraph = ({ data, description }: BarGraphProps) => {
    console.log("data ")
  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Payout Overview</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={{}}
          className="aspect-auto h-[280px] w-full"
        >
          <BarChart
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="title"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => value.slice(0, 10)} // Shorten titles
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="payout"
                  labelFormatter={(value) => value}
                />
              }
            />
            <Bar dataKey="payout" fill="hsl(var(--chart-1))" />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
