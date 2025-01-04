// declare interface for search result and its components
export interface SearchResult {
    status: string;
    totalResults: number;
    articles: Article[];
}
export interface Article {
    source: Source;
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: Date;
    content: string;
    saved?: boolean;
}
export interface Source {
    id: string;
    name: string;
}