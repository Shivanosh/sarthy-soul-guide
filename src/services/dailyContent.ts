
export interface DailyQuote {
  text: string;
  author: string;
  category: 'spiritual' | 'motivational' | 'wisdom';
}

export interface GoodDeed {
  text: string;
  category: 'kindness' | 'environment' | 'community' | 'family';
  difficulty: 'easy' | 'medium' | 'hard';
}

// Comprehensive spiritual quotes database
const SPIRITUAL_QUOTES: DailyQuote[] = [
  { text: "The mind is everything. What you think you become.", author: "Buddha", category: "spiritual" },
  { text: "Yoga is a light, which once lit will never dim.", author: "B.K.S. Iyengar", category: "spiritual" },
  { text: "The soul that sees beauty may sometimes walk alone.", author: "Johann Wolfgang von Goethe", category: "spiritual" },
  { text: "Peace comes from within. Do not seek it without.", author: "Buddha", category: "spiritual" },
  { text: "The best way to find yourself is to lose yourself in service.", author: "Mahatma Gandhi", category: "spiritual" },
  { text: "Your task is not to seek for love, but merely to seek and find all the barriers within yourself.", author: "Rumi", category: "spiritual" },
  { text: "The whole purpose of religion is to facilitate love and compassion, patience, tolerance, humility, and forgiveness.", author: "Dalai Lama", category: "spiritual" },
  { text: "In the end, just three things matter: How well we have lived, How well we have loved, How well we have learned to let go.", author: "Jack Kornfield", category: "wisdom" },
  { text: "Be yourself and you will be at peace.", author: "Lao Tzu", category: "spiritual" },
  { text: "The greatest revolution of our generation is the discovery that human beings can alter their lives by altering their attitudes.", author: "William James", category: "motivational" },
  { text: "Happiness is not something ready made. It comes from your own actions.", author: "Dalai Lama", category: "spiritual" },
  { text: "The present moment is the only time over which we have dominion.", author: "Thich Nhat Hanh", category: "spiritual" },
  { text: "Do not believe in anything simply because you have heard it.", author: "Buddha", category: "wisdom" },
  { text: "The way is not in the sky. The way is in the heart.", author: "Buddha", category: "spiritual" },
  { text: "Silence is the language of god, all else is poor translation.", author: "Rumi", category: "spiritual" }
];

// Comprehensive good deeds database
const GOOD_DEEDS: GoodDeed[] = [
  { text: "Smile at a stranger and brighten their day", category: "kindness", difficulty: "easy" },
  { text: "Help someone carry their groceries", category: "kindness", difficulty: "easy" },
  { text: "Call a friend or family member you haven't spoken to in a while", category: "family", difficulty: "easy" },
  { text: "Donate to a local charity or food bank", category: "community", difficulty: "medium" },
  { text: "Volunteer at a community center", category: "community", difficulty: "hard" },
  { text: "Plant a tree or tend to a garden", category: "environment", difficulty: "medium" },
  { text: "Write a thank you note to someone who has helped you", category: "kindness", difficulty: "easy" },
  { text: "Offer to help a neighbor with their chores", category: "community", difficulty: "medium" },
  { text: "Listen to someone who needs to talk", category: "kindness", difficulty: "easy" },
  { text: "Practice random acts of kindness throughout the day", category: "kindness", difficulty: "medium" },
  { text: "Compliment someone genuinely", category: "kindness", difficulty: "easy" },
  { text: "Hold the door open for someone", category: "kindness", difficulty: "easy" },
  { text: "Pick up litter in your neighborhood", category: "environment", difficulty: "easy" },
  { text: "Teach someone a skill you know", category: "community", difficulty: "medium" },
  { text: "Forgive someone who has wronged you", category: "spiritual", difficulty: "hard" }
];

export class DailyContentService {
  private static instance: DailyContentService;
  
  public static getInstance(): DailyContentService {
    if (!DailyContentService.instance) {
      DailyContentService.instance = new DailyContentService();
    }
    return DailyContentService.instance;
  }

  // Get daily quote (rotates based on date)
  public getDailyQuote(): DailyQuote {
    const today = new Date();
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
    const index = dayOfYear % SPIRITUAL_QUOTES.length;
    return SPIRITUAL_QUOTES[index];
  }

  // Get daily good deed (rotates based on date)
  public getDailyGoodDeed(): GoodDeed {
    const today = new Date();
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
    const index = (dayOfYear + 7) % GOOD_DEEDS.length; // Offset to avoid same index as quotes
    return GOOD_DEEDS[index];
  }

  // Get random quote
  public getRandomQuote(): DailyQuote {
    const index = Math.floor(Math.random() * SPIRITUAL_QUOTES.length);
    return SPIRITUAL_QUOTES[index];
  }

  // Get random good deed
  public getRandomGoodDeed(): GoodDeed {
    const index = Math.floor(Math.random() * GOOD_DEEDS.length);
    return GOOD_DEEDS[index];
  }

  // Future: Connect to Python web scraper API
  public async fetchFromAPI(): Promise<{ quote: DailyQuote; goodDeed: GoodDeed }> {
    try {
      // This will be replaced with actual API call to Python backend
      const response = await fetch('/api/daily-content');
      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.log('API not available, using local content');
    }
    
    // Fallback to local content
    return {
      quote: this.getDailyQuote(),
      goodDeed: this.getDailyGoodDeed()
    };
  }

  // Save content with date stamp
  public saveDailyContent(quote: DailyQuote, goodDeed: GoodDeed): void {
    const today = new Date().toDateString();
    localStorage.setItem('dailyQuote', quote.text + " - " + quote.author);
    localStorage.setItem('dailyGoodDeed', goodDeed.text);
    localStorage.setItem('dailyQuoteDate', today);
    localStorage.setItem('dailyContentData', JSON.stringify({ quote, goodDeed, date: today }));
  }

  // Load saved content or get new content
  public async loadDailyContent(): Promise<{ quote: string; goodDeed: string }> {
    const today = new Date().toDateString();
    const savedDate = localStorage.getItem('dailyQuoteDate');
    
    if (savedDate === today) {
      const savedQuote = localStorage.getItem('dailyQuote') || '';
      const savedGoodDeed = localStorage.getItem('dailyGoodDeed') || '';
      if (savedQuote && savedGoodDeed) {
        return { quote: savedQuote, goodDeed: savedGoodDeed };
      }
    }
    
    // Get new content
    const content = await this.fetchFromAPI();
    const quoteText = `${content.quote.text} - ${content.quote.author}`;
    const goodDeedText = content.goodDeed.text;
    
    this.saveDailyContent(content.quote, content.goodDeed);
    
    return { quote: quoteText, goodDeed: goodDeedText };
  }
}

// Export singleton instance
export const dailyContentService = DailyContentService.getInstance();
