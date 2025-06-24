
interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  channelTitle: string;
  publishedAt: string;
  duration?: string;
  viewCount?: string;
}

interface YouTubeSearchResponse {
  items: any[];
  nextPageToken?: string;
  totalResults: number;
}

class YouTubeService {
  private getApiKey(): string | null {
    const settings = localStorage.getItem('adminSettings');
    if (settings) {
      const { youtubeApiKey } = JSON.parse(settings);
      return youtubeApiKey || null;
    }
    return null;
  }

  async searchVideos(query: string, maxResults: number = 12, category: string = ''): Promise<YouTubeVideo[]> {
    const apiKey = this.getApiKey();
    if (!apiKey) {
      throw new Error('YouTube API key not configured');
    }

    const searchQuery = category ? `${query} ${category}` : query;
    
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?` +
        `part=snippet&q=${encodeURIComponent(searchQuery)}&` +
        `type=video&maxResults=${maxResults}&` +
        `order=relevance&` +
        `key=${apiKey}`
      );

      if (!response.ok) {
        throw new Error('YouTube API request failed');
      }

      const data: YouTubeSearchResponse = await response.json();
      
      return data.items.map(item => ({
        id: item.id.videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnail: item.snippet.thumbnails.medium.url,
        channelTitle: item.snippet.channelTitle,
        publishedAt: item.snippet.publishedAt
      }));
    } catch (error) {
      console.error('YouTube search error:', error);
      throw error;
    }
  }

  async getVideoDetails(videoId: string): Promise<YouTubeVideo | null> {
    const apiKey = this.getApiKey();
    if (!apiKey) {
      throw new Error('YouTube API key not configured');
    }

    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?` +
        `part=snippet,statistics,contentDetails&` +
        `id=${videoId}&` +
        `key=${apiKey}`
      );

      if (!response.ok) {
        throw new Error('YouTube API request failed');
      }

      const data = await response.json();
      
      if (data.items.length === 0) {
        return null;
      }

      const item = data.items[0];
      return {
        id: item.id,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnail: item.snippet.thumbnails.medium.url,
        channelTitle: item.snippet.channelTitle,
        publishedAt: item.snippet.publishedAt,
        duration: item.contentDetails.duration,
        viewCount: item.statistics.viewCount
      };
    } catch (error) {
      console.error('YouTube video details error:', error);
      throw error;
    }
  }

  async getSpiritualContent(): Promise<{
    meditations: YouTubeVideo[];
    bhajans: YouTubeVideo[];
    talks: YouTubeVideo[];
    yoga: YouTubeVideo[];
  }> {
    try {
      const [meditations, bhajans, talks, yoga] = await Promise.all([
        this.searchVideos('guided meditation spiritual', 8),
        this.searchVideos('bhajan kirtan devotional songs', 8),
        this.searchVideos('spiritual talk wisdom teachings', 8),
        this.searchVideos('yoga asana pranayama', 8)
      ]);

      return { meditations, bhajans, talks, yoga };
    } catch (error) {
      console.error('Error fetching spiritual content:', error);
      return { meditations: [], bhajans: [], talks: [], yoga: [] };
    }
  }

  getEmbedUrl(videoId: string): string {
    return `https://www.youtube.com/embed/${videoId}`;
  }

  getWatchUrl(videoId: string): string {
    return `https://www.youtube.com/watch?v=${videoId}`;
  }

  formatDuration(duration: string): string {
    // Convert ISO 8601 duration to readable format
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    if (!match) return '';
    
    const hours = match[1] ? parseInt(match[1]) : 0;
    const minutes = match[2] ? parseInt(match[2]) : 0;
    const seconds = match[3] ? parseInt(match[3]) : 0;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }
}

export const youtubeService = new YouTubeService();
export type { YouTubeVideo };
