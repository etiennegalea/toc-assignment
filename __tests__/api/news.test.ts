import { GET } from '@/api/news/route';

describe('News API Route', () => {

  it('should return 400 when query is missing', async () => {
    const req = new Request('http://localhost/api/news');
    const response = await GET(req);
    const data = await response.json();
    
    expect(response.status).toBe(400);
    expect(data.error).toBe('Query parameter is required');
  });

  it('should fetch news successfully with valid query', async () => {
    global.fetch = jest.fn(() => (
        Promise.resolve({
            ok: true,
            json: () => Promise.resolve({ articles: [] })
        }))
    ) as jest.Mock;

    const req = new Request('http://localhost/api/news?q=test');
    const response = await GET(req);
    const data = await response.json();
    
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('https://newsapi.org/v2/everything?q=test')
    );
    expect(data).toHaveProperty('articles');
  });
});
