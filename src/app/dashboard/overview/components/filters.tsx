import React from "react";
import { Type_Filters } from "./main";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
        <Label htmlFor="author" className="text-base text-nowrap">
          Author
        </Label>
        <Input
          id="author"
          type="text"
          name="author"
          value={filters.author}
          onChange={handleFilterChange}
          placeholder="Search by author"
          className="p-2 border rounded-md w-44"
        />
      </div>
      <div className="flex items-center space-x-2">
        <Label htmlFor="startDate" className="text-base text-nowrap">
          Start Date
        </Label>
        <Input
          id="startDate"
          type="date"
          name="startDate"
          value={filters.startDate}
          onChange={handleFilterChange}
          className="p-2 border rounded-md"
        />
      </div>
      <div className="flex items-center space-x-2">
        <Label htmlFor="endDate" className="text-base text-nowrap">
          End Date
        </Label>
        <Input
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
