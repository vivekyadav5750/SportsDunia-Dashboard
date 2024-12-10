"use client";
import {DateRange} from "@/app/dashboard/articles/components/MainComponent";

export default function Filters({
  author,
  setAuthor,
  dateRange,
  setDateRange,
  searchQuery,
  setSearchQuery
}: {
  author: string;
  setAuthor: (author: string) => void;
  dateRange: { start: string; end: string };
  setDateRange: (dateRange: DateRange) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}) {
  return (
    <>
      {/* Filters Section */}
      <div className="flex flex-col gap-4 md:flex-row md:gap-8">
        <input
          type="text"
          placeholder="Search by author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="px-4 py-2 border rounded w-full md:w-1/4"
        />
        <div className="flex flex-col gap-2 md:flex-row">
          <input
            type="date"
            value={dateRange.start}
            onChange={(e) =>
              setDateRange({ ...dateRange, start: e.target.value })
            }
            className="px-4 py-2 border rounded w-full md:w-auto"
          />
          <input
            type="date"
            value={dateRange.end}
            onChange={(e) =>
              setDateRange({ ...dateRange, end: e.target.value })
            }
            className="px-4 py-2 border rounded w-full md:w-auto"
          />
        </div>
        {/* <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="px-4 py-2 border rounded w-full md:w-1/4"
        >
          <option value="">All Types</option>
          <option value="news">News</option>
          <option value="blogs">Blogs</option>
        </select> */}
      </div>

      {/* Search Bar */}
      <div className="my-4">
        <input
          type="text"
          placeholder="Search articles"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 border rounded"
        />
      </div>
    </>
  );
}
