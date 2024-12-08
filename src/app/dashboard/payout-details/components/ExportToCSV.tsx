import { Button } from "@/components/ui/button";
import React from "react";

interface Props {
  data: Array<{ [key: string]: string | number }>;
}

const ExportToCSV: React.FC<Props> = ({ data }) => {
  const handleExportCSV = () => {
    if (data.length === 0) {
      alert("No data available for export.");
      return;
    }

    // Generate CSV content
    const headers = Object.keys(data[0]).join(","); // Extract header row from the first object
    const rows = data
      .map((row) =>
        Object.values(row)
          .map((value) => `"${value}"`) // Wrap values in quotes to handle special characters
          .join(",")
      )
      .join("\n");

    const csvContent = `${headers}\n${rows}`;

    // Create a Blob with the CSV content
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

    // Create a link to trigger the download
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.download = "payout_report.csv";

    // Trigger the download
    link.click();

    // Clean up the URL object after download
    URL.revokeObjectURL(url);
  };

  return <Button onClick={handleExportCSV}>Export as CSV</Button>;
};

export default ExportToCSV;
