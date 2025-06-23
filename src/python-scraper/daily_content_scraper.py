
#!/usr/bin/env python3
"""
Daily Content Web Scraper for AapkaSarthy
This Python script scrapes spiritual quotes and good deeds from various sources
and provides them via a simple API endpoint.

Usage:
    python daily_content_scraper.py

API Endpoints:
    GET /api/daily-content - Returns daily quote and good deed
    GET /api/random-quote - Returns random spiritual quote
    GET /api/random-deed - Returns random good deed

Requirements:
    pip install requests beautifulsoup4 flask flask-cors schedule
"""

import requests
from bs4 import BeautifulSoup
import json
import random
import schedule
import time
from datetime import datetime
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

class DailyContentScraper:
    def __init__(self):
        self.quotes_sources = [
            "https://www.brainyquote.com/topics/spiritual-quotes",
            "https://www.goodreads.com/quotes/tag/spirituality",
            "https://www.azquotes.com/quotes/topics/spiritual.html"
        ]
        
        self.good_deeds_sources = [
            "https://www.randomactsofkindness.org/kindness-ideas",
            "https://www.helpguide.org/articles/healthy-living/volunteering-and-its-surprising-benefits.htm"
        ]
        
        self.daily_cache = {
            'quotes': [],
            'good_deeds': [],
            'last_updated': None
        }
        
        # Fallback content in case scraping fails
        self.fallback_quotes = [
            {"text": "The mind is everything. What you think you become.", "author": "Buddha", "category": "spiritual"},
            {"text": "Peace comes from within. Do not seek it without.", "author": "Buddha", "category": "spiritual"},
            {"text": "Your task is not to seek for love, but merely to seek and find all the barriers within yourself.", "author": "Rumi", "category": "spiritual"},
            {"text": "The whole purpose of religion is to facilitate love and compassion, patience, tolerance, humility, and forgiveness.", "author": "Dalai Lama", "category": "spiritual"},
            {"text": "Be yourself and you will be at peace.", "author": "Lao Tzu", "category": "spiritual"}
        ]
        
        self.fallback_deeds = [
            {"text": "Smile at a stranger and brighten their day", "category": "kindness", "difficulty": "easy"},
            {"text": "Help someone carry their groceries", "category": "kindness", "difficulty": "easy"},
            {"text": "Call a friend or family member you haven't spoken to in a while", "category": "family", "difficulty": "easy"},
            {"text": "Write a thank you note to someone who has helped you", "category": "kindness", "difficulty": "easy"},
            {"text": "Listen to someone who needs to talk", "category": "kindness", "difficulty": "easy"}
        ]

    def scrape_quotes(self):
        """Scrape spiritual quotes from various sources"""
        quotes = []
        
        try:
            # Example scraping logic (customize based on actual websites)
            for source in self.quotes_sources:
                try:
                    response = requests.get(source, timeout=10)
                    soup = BeautifulSoup(response.content, 'html.parser')
                    
                    # This would need to be customized for each website's structure
                    # Example for a generic quote site:
                    quote_elements = soup.find_all('div', class_='quote')
                    
                    for element in quote_elements[:5]:  # Get first 5 quotes
                        text = element.find('span', class_='text')
                        author = element.find('span', class_='author')
                        
                        if text and author:
                            quotes.append({
                                'text': text.get_text().strip(),
                                'author': author.get_text().strip(),
                                'category': 'spiritual'
                            })
                            
                except Exception as e:
                    print(f"Error scraping {source}: {e}")
                    continue
                    
        except Exception as e:
            print(f"General error in scraping quotes: {e}")
        
        # Use fallback if scraping failed
        if not quotes:
            quotes = self.fallback_quotes
            
        return quotes

    def scrape_good_deeds(self):
        """Scrape good deed ideas from various sources"""
        deeds = []
        
        try:
            # Similar scraping logic for good deeds
            # This would be customized based on the actual websites
            pass
        except Exception as e:
            print(f"Error scraping good deeds: {e}")
        
        # Use fallback for now or if scraping failed
        deeds = self.fallback_deeds
        return deeds

    def update_daily_content(self):
        """Update the daily content cache"""
        print(f"Updating daily content at {datetime.now()}")
        
        quotes = self.scrape_quotes()
        deeds = self.scrape_good_deeds()
        
        self.daily_cache = {
            'quotes': quotes,
            'good_deeds': deeds,
            'last_updated': datetime.now().isoformat()
        }
        
        print(f"Updated with {len(quotes)} quotes and {len(deeds)} good deeds")

    def get_daily_quote(self):
        """Get quote based on current date"""
        if not self.daily_cache['quotes']:
            self.update_daily_content()
        
        day_of_year = datetime.now().timetuple().tm_yday
        index = day_of_year % len(self.daily_cache['quotes'])
        return self.daily_cache['quotes'][index]

    def get_daily_good_deed(self):
        """Get good deed based on current date"""
        if not self.daily_cache['good_deeds']:
            self.update_daily_content()
        
        day_of_year = datetime.now().timetuple().tm_yday
        index = (day_of_year + 7) % len(self.daily_cache['good_deeds'])  # Offset to vary from quotes
        return self.daily_cache['good_deeds'][index]

    def get_random_quote(self):
        """Get random quote"""
        if not self.daily_cache['quotes']:
            self.update_daily_content()
        return random.choice(self.daily_cache['quotes'])

    def get_random_good_deed(self):
        """Get random good deed"""
        if not self.daily_cache['good_deeds']:
            self.update_daily_content()
        return random.choice(self.daily_cache['good_deeds'])

# Initialize scraper
scraper = DailyContentScraper()

# API Endpoints
@app.route('/api/daily-content')
def get_daily_content():
    """Get daily quote and good deed"""
    try:
        quote = scraper.get_daily_quote()
        good_deed = scraper.get_daily_good_deed()
        
        return jsonify({
            'quote': quote,
            'goodDeed': good_deed,
            'date': datetime.now().isoformat(),
            'status': 'success'
        })
    except Exception as e:
        return jsonify({
            'error': str(e),
            'status': 'error'
        }), 500

@app.route('/api/random-quote')
def get_random_quote():
    """Get random spiritual quote"""
    try:
        quote = scraper.get_random_quote()
        return jsonify({
            'quote': quote,
            'status': 'success'
        })
    except Exception as e:
        return jsonify({
            'error': str(e),
            'status': 'error'
        }), 500

@app.route('/api/random-deed')
def get_random_deed():
    """Get random good deed"""
    try:
        deed = scraper.get_random_good_deed()
        return jsonify({
            'goodDeed': deed,
            'status': 'success'
        })
    except Exception as e:
        return jsonify({
            'error': str(e),
            'status': 'error'
        }), 500

@app.route('/api/update-content')
def update_content():
    """Manually trigger content update"""
    try:
        scraper.update_daily_content()
        return jsonify({
            'message': 'Content updated successfully',
            'last_updated': scraper.daily_cache['last_updated'],
            'status': 'success'
        })
    except Exception as e:
        return jsonify({
            'error': str(e),
            'status': 'error'
        }), 500

def schedule_updates():
    """Schedule daily content updates"""
    schedule.every().day.at("00:00").do(scraper.update_daily_content)
    schedule.every().day.at("12:00").do(scraper.update_daily_content)  # Mid-day refresh
    
    while True:
        schedule.run_pending()
        time.sleep(60)  # Check every minute

if __name__ == '__main__':
    # Initial content load
    scraper.update_daily_content()
    
    # Start the Flask app
    # In production, use a proper WSGI server like Gunicorn
    print("Starting Daily Content Scraper API...")
    print("Available endpoints:")
    print("  GET /api/daily-content - Daily quote and good deed")
    print("  GET /api/random-quote - Random spiritual quote")
    print("  GET /api/random-deed - Random good deed")
    print("  GET /api/update-content - Manually update content")
    
    app.run(host='0.0.0.0', port=5000, debug=True)
