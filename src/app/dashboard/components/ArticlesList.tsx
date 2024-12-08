import { Article } from "@/types";
import Image from "next/image";

export function ArticlesList({ articles }: { articles: Article[] }) {
  if (articles.length === 0) {
    return <p>No articles found.</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {articles.map((article, index) => (
        <div
          key={index}
          className="p-4 border rounded shadow hover:shadow-lg transition"
        >
          {article.urlToImage && (
            <Image
              src={article.urlToImage}
              alt={article.title}
              width={400}
              height={200}
              className="object-cover rounded w-full"
            />
          )}
          <h3 className="mt-2 text-xl font-bold">{article.title}</h3>
          <p className="text-gray-600">
            Author: {article.author || "Unknown"} |{" "}
            {new Date(article.publishedAt).toLocaleDateString()}
          </p>
          <p className="text-gray-800">{article.description}</p>
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-2 text-blue-600 hover:underline"
          >
            Read more
          </a>
        </div>
      ))}
    </div>
  );
};

export default ArticlesList;
