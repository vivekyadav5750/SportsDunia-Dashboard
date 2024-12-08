"use client";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { PayoutTable } from "@/app/dashboard/payout-details/components/PayoutTable";
import { fetchNews } from "@/redux/reducer";

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

  return (
    <div className="p-4">
      <h1 className="text-3xl font-semibold mb-4">Payout Calculator</h1>
      <div className="mb-6">
        <label htmlFor="payoutRate" className="block text-lg font-medium">
          Payout Rate per Article/Blog:
          <sup className="text-red-500">
            * This rate will apply for all blog
          </sup>
        </label>
        <input
          id="payoutRate"
          type="number"
          className="mt-2 p-2 border border-gray-300 rounded-md"
          value={payoutRate}
          onChange={handlePayoutRateChange}
        />
        <button
          onClick={handleSetPayout}
          className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Set Payout
        </button>
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
