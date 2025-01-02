'use client';

import React, { useState } from "react";
import { SearchResult, Article } from './types/SearchResult';


const Home = () => {
  const [query, setQuery] = useState<string>("");
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchArticles = async (searchQuery: string) => {
    try {
      setLoading(true);
      setError(null);
  
      const response = await fetch(`/api/news?q=${encodeURIComponent(searchQuery)}`);
      if (!response.ok) {
        throw new Error('Failed to fetch articles');
      }
  
      const data: SearchResult = await response.json();

      // update articles
      const articles: Article[] = data.articles;
      setArticles(articles || []);

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim()) {
      fetchArticles(query.toUpperCase());
    }
  };

  return (
    <div className="news">
      <h1>News Search</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for articles..."
          className="news-search-input"
        />
        <button type="submit" className="news-search-btn">
          Search
        </button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul className="article-list">
        {articles.map((article, index) => (
          <li
            key={index}
            className="article"
          >
            <h2>{article.title}</h2>
            <p>{article.description}</p>
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Read more
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
