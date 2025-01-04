'use client';

import React, { useState, useContext } from "react";
import { SearchResult, Article } from './types/SearchResult';
import { SavedArticlesContext } from './contexts/savedArticlesContext';

const Home = () => {
  const [query, setQuery] = useState<string>("");
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  
  const { onAddToSavedArticle, onRemoveFromSavedArticle } = useContext(SavedArticlesContext);
  
  const fetchArticles = async (searchQuery: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`/api/news?q=${encodeURIComponent(searchQuery)}`);
      if (!response.ok) {a
        throw new Error('Failed to fetch articles');
      }
      
      const data: SearchResult = await response.json();
      
      // update articles
      const newArticles: Article[] = data.articles;
      setArticles(newArticles || []);
      
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
  
  const handleSave = (article: Article) => {
    try {
      if (article.saved) {
        removeArticle(article);
      } else {
        saveArticle(article);
      }
    } catch (err: any) {
      console.log(`Could not be saved: ${err}`)
    }
  };
  
  const saveArticle = (article: Article) => {
    setArticles(articles.map(a => 
      a.url == article.url ? { ...a, saved: true } : a
    ))
    onAddToSavedArticle(article);
  };
  
  const removeArticle = (article: Article) => {
    setArticles(articles.map(a => 
      a.url == article.url ? { ...a, saved: false } : a
    ))
    onRemoveFromSavedArticle(article);
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
    {articles.map(article => (
      article.url !== "https://removed.com" && (
        <li
        key={article.url}
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
        <button 
        className={`save ${article.saved ? 'saved' : ''}`}
        onClick={() => handleSave(article)}
        >
        {article.saved ? 'saved' : 'save'}
        </button>
        </li>
      )
    ))}
    </ul>
    </div>
  );
};
export default Home;
