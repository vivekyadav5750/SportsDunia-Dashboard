import React from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { Button } from "@/components/ui/button";

interface Props {
  data: Array<{ [key: string]: string | number }>;
}

const ExportToPDF: React.FC<Props> = ({ data }) => {
  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text("Payout Report", 14, 10);
    const tableData = data.map((row) => Object.values(row));
    const headers = Object.keys(data[0] || {});

    doc.autoTable({
      head: [headers],
      body: tableData
    });

    doc.save("payout_report.pdf");
  };

  return <Button onClick={handleExportPDF}>Export as PDF</Button>;
};

export default ExportToPDF;
