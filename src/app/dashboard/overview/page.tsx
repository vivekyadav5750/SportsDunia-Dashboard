import Main from "./components/main";
import { Article, NewsApiResponse } from "@/types";

export default async function DashboardPage() {
  let articles: Article[] = [];

  // call api to get the data for the category
  try {
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=sports&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`
    );

    if (!response.ok) {
      //TODO: handle error and show error message to user
      return <div>Server error : {response.status} </div>;
    }

    const ArticleData = (await response.json()) as NewsApiResponse;
    articles = ArticleData.articles;

    if (!articles) {
      return <div>No data found</div>;
    }
  } catch (error) {
    console.log("error: ", error);
    return <div>No data found</div>;
  }

  // Filter Data (author is null)
  articles = articles.filter((article) => article.author !== null);


  return (
    <div className="min-h-screen bg-gray-50 p-6 text-gray-900">
      <Main articles={articles} />
    </div>
  );
}
