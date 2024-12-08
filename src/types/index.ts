import { Icons } from "@/components/icons";

export interface NavItem {
  title: string;
  url: string;
  disabled?: boolean;
  external?: boolean;
  shortcut?: [string, string];
  icon?: keyof typeof Icons;
  label?: string;
  description?: string;
  isActive?: boolean;
  items?: NavItem[];
}
export interface Source {
  id: string | null;
  name: string;
}

export interface Article {
  source: Source;
  author: string | null;
  title: string;
  description: string;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string;
}

export interface NewsApiResponse {
  status: string;
  totalResults: number;
  articles: Article[];
}
