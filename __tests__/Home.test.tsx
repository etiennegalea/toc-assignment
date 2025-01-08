import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import Home, {handleSearch} from '@/page'
import { SavedArticlesContext } from '@/contexts/savedArticlesContext'

describe('Home', () => {

    const mockArticles = {
        articles: [
            {
                title: 'Test Article',
                description: 'This is a test article',
                url: 'https://example.com/test-article',
                saved: false
            },
            {
                title: 'Test Article 2',
                description: 'This is a second test article',
                url: 'https://example.com/test-article-2',
                saved: false
            }
        ]
    }

    it('should trim white spaces from search input text and return them in upper case', () => {
        const input = '   test   '
        
        handleSearch

    }
});
