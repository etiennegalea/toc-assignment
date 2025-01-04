'use client';

import React, { useContext } from "react";
import { Article } from './types/SearchResult';
import { SavedArticlesContext } from "../contexts/savedArticlesContext";

export default function MyList() {
  
  const { savedArticles, onRemoveFromSavedArticle } = useContext(SavedArticlesContext);
  
  return (
    <div>
    <ul className="article-list">
    {savedArticles.map((article): Article => (
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
        onClick={() => onRemoveFromSavedArticle(article)}
        >
        {article.saved ? 'saved' : 'save'}
        </button>
        </li>
      )
    ))}
    </ul>
    </div>
  )
}