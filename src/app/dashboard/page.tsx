// "use client";
// import { useEffect, useState } from "react";
// import { fetchNews } from "../../redux/reducer";
// import { RootState } from "../../redux/store";
// import { useAppDispatch, useAppSelector } from "@/redux/hooks";
// import ArticlesList from "./components/ArticlesList";

// const DashboardPage = () => {
//   const dispatch = useAppDispatch();
//   const { articles, loading, error } = useAppSelector(
//     (state: RootState) => state.news
//   );

//   const [filteredArticles, setFilteredArticles] = useState(articles);
//   const [author, setAuthor] = useState("");
//   const [dateRange, setDateRange] = useState({ start: "", end: "" });
//   const [searchQuery, setSearchQuery] = useState("");

//   useEffect(() => {
//     dispatch(fetchNews("sports"));
//   }, [dispatch]);

//   useEffect(() => {
//     let updatedArticles = articles;
//     updatedArticles = updatedArticles.filter((article) => article.author);

//     if (author) {
//       updatedArticles = updatedArticles.filter((article) =>
//         article.author?.toLowerCase().includes(author.toLowerCase())
//       );
//     }

//     if (dateRange.start && dateRange.end) {
//       updatedArticles = updatedArticles.filter((article) => {
//         const publishedDate = new Date(article.publishedAt);
//         const startDate = new Date(dateRange.start);
//         const endDate = new Date(dateRange.end);
//         return publishedDate >= startDate && publishedDate <= endDate;
//       });
//     }

//     // if (type) {
//     //   updatedArticles = updatedArticles.filter((article) =>
//     //     article.type?.toLowerCase().includes(type.toLowerCase())
//     //   );
//     // }

//     if (searchQuery) {
//       updatedArticles = updatedArticles.filter((article) =>
//         article.title?.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//     }

//     setFilteredArticles(updatedArticles);
//   }, [articles, author, dateRange, searchQuery]);

//   return (
//     <div className="p-4 md:p-8">
//       <h1 className="text-2xl font-bold mb-4">Sports News</h1>

//       {/* Filters Section */}
//       <div className="flex flex-col gap-4 md:flex-row md:gap-8">
//         <input
//           type="text"
//           placeholder="Search by author"
//           value={author}
//           onChange={(e) => setAuthor(e.target.value)}
//           className="px-4 py-2 border rounded w-full md:w-1/4"
//         />
//         <div className="flex flex-col gap-2 md:flex-row">
//           <input
//             type="date"
//             value={dateRange.start}
//             onChange={(e) =>
//               setDateRange((prev) => ({ ...prev, start: e.target.value }))
//             }
//             className="px-4 py-2 border rounded w-full md:w-auto"
//           />
//           <input
//             type="date"
//             value={dateRange.end}
//             onChange={(e) =>
//               setDateRange((prev) => ({ ...prev, end: e.target.value }))
//             }
//             className="px-4 py-2 border rounded w-full md:w-auto"
//           />
//         </div>
//         {/* <select
//           value={type}
//           onChange={(e) => setType(e.target.value)}
//           className="px-4 py-2 border rounded w-full md:w-1/4"
//         >
//           <option value="">All Types</option>
//           <option value="news">News</option>
//           <option value="blogs">Blogs</option>
//         </select> */}
//       </div>

//       {/* Search Bar */}
//       <div className="my-4">
//         <input
//           type="text"
//           placeholder="Search articles"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           className="w-full px-4 py-2 border rounded"
//         />
//       </div>

//       {/* Content Section */}
//       {loading && <p>Loading...</p>}
//       {error && <p className="text-red-500">{error}</p>}
//       <ArticlesList articles={filteredArticles} />
//     </div>
//   );
// };

// export default DashboardPage;
import { auth } from "../../../auth";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await auth();
  console.log("session", session);

  if (!session?.user) {
    return redirect("/");
  } else {
    redirect("/dashboard/overview");
  }
}
