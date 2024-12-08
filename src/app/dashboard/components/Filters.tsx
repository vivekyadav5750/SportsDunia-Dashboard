"use client";

export default function Filters({
  onSearch,
}: {
  onSearch: (query: string) => void;
}) {
  return (
    <div className="flex items-center gap-4">
      <input
        type="text"
        placeholder="Search by keyword"
        className="p-2 border rounded"
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
}
