
# Daily Content Web Scraper for AapkaSarthy

This Python-based web scraper provides daily spiritual quotes and good deeds for the AapkaSarthy application.

## Features

- Scrapes spiritual quotes from multiple sources
- Provides daily good deed suggestions
- Caches content to reduce API calls
- Provides REST API endpoints for the React frontend
- Automatic daily content updates
- Fallback content in case scraping fails

## Setup Instructions

### Prerequisites

```bash
# Install Python 3.8+
# Install pip package manager
```

### Installation

1. **Install required packages:**
```bash
pip install requests beautifulsoup4 flask flask-cors schedule
```

2. **Run the scraper:**
```bash
cd src/python-scraper
python daily_content_scraper.py
```

3. **The API will be available at:**
```
http://localhost:5000
```

### API Endpoints

- `GET /api/daily-content` - Returns daily quote and good deed
- `GET /api/random-quote` - Returns random spiritual quote  
- `GET /api/random-deed` - Returns random good deed
- `GET /api/update-content` - Manually triggers content update

### Integration with React Frontend

The React app will automatically try to connect to the Python API. If the API is not available, it will use local fallback content.

To enable the connection:

1. Start the Python scraper (instructions above)
2. The React app will automatically detect the API at `http://localhost:5000`
3. Daily content will be fetched from the scraper instead of using local data

### Deployment Options

#### Option 1: Local Development
- Run the Python script locally alongside your React app
- Good for testing and development

#### Option 2: Cloud Deployment
- Deploy to Heroku, AWS, Google Cloud, or similar
- Update the API URL in the React frontend
- Set up proper environment variables

#### Option 3: Docker Deployment
```bash
# Create a Dockerfile for the scraper
# Deploy using Docker containers
```

### Customization

#### Adding New Quote Sources

Edit the `quotes_sources` list in `daily_content_scraper.py`:

```python
self.quotes_sources = [
    "https://your-quote-source.com",
    # Add more sources here
]
```

#### Adding New Good Deed Sources

Edit the `good_deeds_sources` list:

```python
self.good_deeds_sources = [
    "https://your-good-deeds-source.com",
    # Add more sources here
]
```

#### Customizing Scraping Logic

Each website has different HTML structure. Update the scraping logic in the `scrape_quotes()` and `scrape_good_deeds()` methods to match the target websites.

### Production Considerations

1. **Rate Limiting**: Add delays between requests to avoid being blocked
2. **User Agents**: Rotate user agents to appear more human-like
3. **Error Handling**: Implement robust error handling and logging
4. **Caching**: Use Redis or similar for better caching in production
5. **WSGI Server**: Use Gunicorn or similar instead of Flask's development server

### Troubleshooting

#### Common Issues:

1. **Import errors**: Make sure all packages are installed
2. **Connection refused**: Check if the API is running on port 5000
3. **Scraping failures**: Websites may have changed their structure
4. **CORS errors**: The Flask-CORS package should handle this

#### Debugging:

```bash
# Run with verbose logging
python daily_content_scraper.py --debug

# Check if API is responding
curl http://localhost:5000/api/daily-content
```

### Legal Considerations

- Respect robots.txt files of target websites
- Don't overload servers with too many requests
- Consider using official APIs when available
- Comply with terms of service of scraped websites

### Future Enhancements

- [ ] Add more diverse content sources
- [ ] Implement content quality filtering
- [ ] Add user preference-based content selection
- [ ] Integrate with social media APIs for trending spiritual content
- [ ] Add multilingual support for quotes in different Indian languages
- [ ] Implement content categorization and tagging
```
