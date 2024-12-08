import React from "react";
import { Type_Filters } from "../page";

export default function Filters({
  filters,
  handleFilterChange
}: {
  filters: Type_Filters;
  handleFilterChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="mb-8 flex flex-wrap gap-6">
      <div className="flex items-center space-x-2">
        <label htmlFor="author" className="font-medium">
          Author
        </label>
        <input
          id="author"
          type="text"
          name="author"
          value={filters.author}
          onChange={handleFilterChange}
          placeholder="Search by author"
          className="p-2 border rounded-md"
        />
      </div>
      <div className="flex items-center space-x-2">
        <label htmlFor="startDate" className="font-medium">
          Start Date
        </label>
        <input
          id="startDate"
          type="date"
          name="startDate"
          value={filters.startDate}
          onChange={handleFilterChange}
          className="p-2 border rounded-md"
        />
      </div>
      <div className="flex items-center space-x-2">
        <label htmlFor="endDate" className="font-medium">
          End Date
        </label>
        <input
          id="endDate"
          type="date"
          name="endDate"
          value={filters.endDate}
          onChange={handleFilterChange}
          className="p-2 border rounded-md"
        />
      </div>
    </div>
  );
}
