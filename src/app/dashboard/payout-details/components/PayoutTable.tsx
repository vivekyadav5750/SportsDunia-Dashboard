// components/PayoutTable.tsx
import { Article } from "@/types"; // Assuming you have Article type defined
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

interface PayoutTableProps {
  articles: Article[];
  payouts: { [url: string]: number };
  setPayouts: React.Dispatch<React.SetStateAction<{ [url: string]: number }>>;
}

export const PayoutTable = ({ articles, payouts, setPayouts }: PayoutTableProps) => {
  const handleInlineEdit = (url: string, newPayout: number) => {
    const updatedPayouts = { ...payouts, [url]: newPayout };
    setPayouts(updatedPayouts);
    localStorage.setItem("payouts", JSON.stringify(updatedPayouts));
  };

  return (
    <Table className="mt-6 w-full">
      <TableHeader>
        <TableRow>
          <TableHead className="text-left">Author</TableHead>
          <TableHead className="text-left">Title</TableHead>
          <TableHead className="text-right">Payout</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {articles.map((article) => (
          <TableRow key={article.url}>
            <TableCell className="text-left">{article.author}</TableCell>
            <TableCell className="text-left">{article.title}</TableCell>
            <TableCell className="text-right">
              <input
                type="number"
                value={payouts[article.url] || 0}
                onChange={(e) => handleInlineEdit(article.url, +e.target.value)}
                className="p-2 border rounded-md text-right"
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default PayoutTable;
