// declare interface for search result and its components
interface SearchResult {
    status: string;
    totalResults: number;
    articles: Article[];
}
interface Article {
    source: Source;
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: Date;
    content: string;
}
interface Source {
    id: string;
    name: string;
}