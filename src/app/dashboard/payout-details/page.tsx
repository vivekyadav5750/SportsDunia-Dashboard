"use client";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { PayoutTable } from "@/app/dashboard/payout-details/components/PayoutTable";
import { fetchNews } from "@/redux/reducer";
import ExportToCSV from "@/components/exports/ExportToCSV";
import ExportToPDF from "@/components/exports/ExportToPDF";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const PayoutAdmin = () => {
  const dispatch = useAppDispatch();
  const { articles } = useAppSelector((state) => state.news);

  const [payouts, setPayouts] = useState<{ [key: string]: number }>(() => {
    const storedPayouts = localStorage.getItem("payouts");
    return storedPayouts ? JSON.parse(storedPayouts) : {};
  });
  const [payoutRate, setPayoutRate] = useState(0);

  useEffect(() => {
    dispatch(fetchNews("sports"));
  }, [dispatch]);

  useEffect(() => {
    const totalPayout = articles.reduce(
      (acc, article) => acc + (payouts[article.url] || 0), // Use article URL to uniquely identify
      0
    );
    localStorage.setItem("totalPayout", JSON.stringify(totalPayout));
  }, [payouts, articles]);

  const handlePayoutRateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPayoutRate(Number(event.target.value));
  };

  const handleSetPayout = () => {
    const updatedPayouts = articles.reduce<{ [key: string]: number }>(
      (acc, article) => {
        acc[article.url] = payoutRate; // Store the payout by article URL
        return acc;
      },
      {}
    );
    setPayouts(updatedPayouts);
    localStorage.setItem("payouts", JSON.stringify(updatedPayouts));
  };

  const totalPayout = Object.values(payouts).reduce(
    (acc, value) => acc + value,
    0
  );

  // Combine payouts and articles for exporting
  const combinedData = articles.map((article) => ({
    Author: article.author || "Unknown",
    Title: article.title,
    PublishedAt: article.publishedAt,
    Payout: payouts[article.url] || 0
  }));

  return (
    <div className="p-4">
      <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start sm:space-x-6">
        <h1 className="text-3xl font-bold mb-6"> Payout Calculator</h1>

        <div className="flex flex-wrap gap-4 sm:gap-6">
          <ExportToCSV data={combinedData} />
          <ExportToPDF data={combinedData} />
        </div>
      </div>

      <div className="my-6 space-y-2">
        <label htmlFor="payoutRate" className="block text-lg font-medium">
          Payout Rate per Article/Blog:
          <sup className="text-red-500">
            * This rate will apply for all blog
          </sup>
        </label>
        <div className="flex space-x-5">
          <Input
            id="payoutRate"
            type="number"
            // className="mt-2 p-2 border border-gray-300 rounded-md"
            className="w-24"
            value={payoutRate}
            onChange={handlePayoutRateChange}
          />
          <Button onClick={handleSetPayout}>Set Payout</Button>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold">Total Payout: ${totalPayout}</h2>
      </div>

      <PayoutTable
        articles={articles}
        payouts={payouts}
        setPayouts={setPayouts}
      />
    </div>
  );
};

export default PayoutAdmin;
