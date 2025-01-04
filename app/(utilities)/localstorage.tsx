'use client';

// Save data to localStorage
export const saveToLocalStorage = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

// Retrieve data from localStorage
export const getFromLocalStorage = (key: string = 'articles') => {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : null;
};