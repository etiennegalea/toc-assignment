'use client'

import React, { createContext, useMemo, useState } from "react";
import { Article } from "../types/SearchResult";
import { getFromLocalStorage, saveToLocalStorage } from "../(utilities)/localstorage";

interface SavedArticlesContextType {
  savedArticles: Article[];
  onAddToSavedArticle: (article: Article) => void;
  onRemoveFromSavedArticle: (article: Article) => void;
}

export const SavedArticlesContext = createContext<SavedArticlesContextType>({ savedArticles: [], onAddToSavedArticle: () => {}, onRemoveFromSavedArticle: () => {} });

export const SavedArticlesProvider = ({ children }: { children: React.ReactNode }) => {
  const [savedArticles, setSavedArticles] = useState<Article[]>(getFromLocalStorage('articles') || []);
  
  const onAddToSavedArticle = (article: Article) => {
    const newSavedArticles = [...savedArticles, { ...article, saved: true }];
    saveToLocalStorage('articles', newSavedArticles);
    setSavedArticles(newSavedArticles);
  };
  
  const onRemoveFromSavedArticle = (article: Article) => {
    const newSavedArticles = savedArticles.filter(obj => obj.url !== article.url);
    saveToLocalStorage('articles', newSavedArticles);
    setSavedArticles(newSavedArticles);
  };
  
  // useMemo for performance optimization
  const contextValue = useMemo(() => ({
    savedArticles,
    onAddToSavedArticle,
    onRemoveFromSavedArticle,
  }), [savedArticles]);
  
  return (
    <SavedArticlesContext.Provider value={contextValue}>
    {children}
    </SavedArticlesContext.Provider>
  );
}