import { Article } from "@/types";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface NewsState {
  articles: Article[];
  loading: boolean;
  error: string | null;
}

export const fetchNews = createAsyncThunk(
  "news/fetchNews",
  async (query: string) => {
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=${query}&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`,
      {
        method: "GET"
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch news");
    }
    const data = (await response.json()) as { articles: Article[] };
    //  remove article which author is null or undefined
    data.articles = data.articles.filter((article) => article.author);
    return data.articles;
  }
);

const initialState: NewsState = {
  articles: [],
  loading: false,
  error: null
};

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.loading = false;
        state.articles = action.payload;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch news";
      });
  }
});

export const newsReducer = newsSlice.reducer;
