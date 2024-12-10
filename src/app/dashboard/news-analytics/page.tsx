import MainComponent from "./components/MainComponent";
import { Article, NewsApiResponse } from "@/types";

export default async function NewsAnalytics() {
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
    <div className="p-6 space-y-8">
      <MainComponent articles={articles} />
    </div>
  );
}
