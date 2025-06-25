import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Search, Play, Book, Music, Video, Youtube, ExternalLink, Heart } from 'lucide-react';
import { toast } from 'sonner';
import { youtubeService, YouTubeVideo } from '@/services/youtubeService';

const MediaLibrary = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [devotionalContent, setDevotionalContent] = useState<{
    videos: YouTubeVideo[];
    music: YouTubeVideo[];
  }>({ videos: [], music: [] });
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<YouTubeVideo[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<string>('');
  const [isApiConfigured, setIsApiConfigured] = useState(false);
  const [uploadedPDFs, setUploadedPDFs] = useState<any[]>([]);

  useEffect(() => {
    checkApiConfiguration();
    loadUploadedPDFs();
    if (isApiConfigured) {
      loadDevotionalContent();
    }
  }, [isApiConfigured]);

  const checkApiConfiguration = () => {
    const settings = localStorage.getItem('adminSettings');
    if (settings) {
      const { youtubeApiKey } = JSON.parse(settings);
      setIsApiConfigured(!!youtubeApiKey);
    }
  };

  const loadUploadedPDFs = () => {
    const pdfs = localStorage.getItem('uploadedPDFs');
    if (pdfs) {
      setUploadedPDFs(JSON.parse(pdfs));
    }
  };

  const loadDevotionalContent = async () => {
    if (!isApiConfigured) return;
    
    setLoading(true);
    try {
      const [videos, music] = await Promise.all([
        youtubeService.searchVideos('devotional bhajan kirtan spiritual songs', 12),
        youtubeService.searchVideos('meditation music mantras om chanting', 12)
      ]);
      setDevotionalContent({ videos, music });
    } catch (error) {
      console.error('Error loading devotional content:', error);
      toast.error('Failed to load YouTube content. Please check API configuration.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    
    if (!isApiConfigured) {
      toast.error('YouTube API not configured. Please contact admin.');
      return;
    }

    setLoading(true);
    try {
      const results = await youtubeService.searchVideos(searchTerm + ' spiritual devotional', 12);
      setSearchResults(results);
      toast.success(`Found ${results.length} videos`);
    } catch (error) {
      console.error('Search error:', error);
      toast.error('Search failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const VideoCard = ({ video }: { video: YouTubeVideo }) => (
    <Card className="hover:shadow-lg transition-shadow cursor-pointer">
      <div className="relative">
        <img 
          src={video.thumbnail} 
          alt={video.title}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        <Button
          size="sm"
          className="absolute top-2 right-2 bg-black/70 hover:bg-black/90"
          onClick={() => setSelectedVideo(video.id)}
        >
          <Play className="h-3 w-3" />
        </Button>
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-sm line-clamp-2 mb-2">{video.title}</h3>
        <p className="text-xs text-gray-600 mb-2">{video.channelTitle}</p>
        <p className="text-xs text-gray-500 line-clamp-2">{video.description}</p>
        <div className="mt-2 flex justify-between items-center">
          <Badge variant="outline" className="text-xs">
            <Heart className="h-3 w-3 mr-1" />
            Devotional
          </Badge>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => window.open(youtubeService.getWatchUrl(video.id), '_blank')}
          >
            <ExternalLink className="h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const staticBooks = [
    { title: 'Bhagavad Gita', author: 'Vyasa', description: 'Ancient wisdom on duty and righteousness', category: 'Scripture', url: '#' },
    { title: 'Ramayana', author: 'Valmiki', description: 'Epic tale of virtue and devotion', category: 'Epic', url: '#' },
    { title: 'The Upanishads', author: 'Various Sages', description: 'Philosophical insights into the nature of reality', category: 'Philosophy', url: '#' },
    { title: 'Yoga Sutras', author: 'Patanjali', description: 'A guide to yoga and meditation', category: 'Yoga', url: '#' },
    { title: 'Tao Te Ching', author: 'Lao Tzu', description: 'A classic text on Taoist philosophy', category: 'Philosophy', url: '#' },
    { title: 'The Dhammapada', author: 'Buddha', description: 'Verses on ethics and mindfulness', category: 'Buddhism', url: '#' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 via-yellow-500 to-green-600 text-white p-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600/90 via-white/10 to-green-600/90"></div>
        <div className="relative max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate('/')}
              className="text-white hover:bg-white/20"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div className="flex items-center space-x-2">
              <Book className="h-6 w-6" />
              <h1 className="text-xl font-bold">Devotional Media Library</h1>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {!isApiConfigured && (
              <Badge className="bg-yellow-500 text-white">
                API Not Configured
              </Badge>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        {/* Search Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Search className="mr-2 h-5 w-5" />
              Search Devotional Content
            </CardTitle>
            <CardDescription>
              {isApiConfigured ? 
                'Search YouTube for devotional videos, bhajans, and spiritual music' :
                'YouTube API not configured. Please contact admin to enable video search.'
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-2">
              <Input
                placeholder="Search for bhajans, kirtans, devotional songs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="flex-1"
                disabled={!isApiConfigured}
              />
              <Button 
                onClick={handleSearch}
                disabled={loading || !isApiConfigured}
                className="bg-orange-500 hover:bg-orange-600"
              >
                <Youtube className="h-4 w-4 mr-1" />
                Search
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Video Player */}
        {selectedVideo && (
          <Card className="mb-8">
            <CardContent className="p-4">
              <div className="aspect-video">
                <iframe
                  src={youtubeService.getEmbedUrl(selectedVideo)}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full rounded-lg"
                ></iframe>
              </div>
              <Button
                variant="outline"
                onClick={() => setSelectedVideo('')}
                className="mt-2"
              >
                Close Player
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Content Tabs */}
        <Tabs defaultValue="devotional" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="devotional">Devotional Videos</TabsTrigger>
            <TabsTrigger value="music">Spiritual Music</TabsTrigger>
            <TabsTrigger value="books">Sacred Texts</TabsTrigger>
            <TabsTrigger value="search">Search Results</TabsTrigger>
          </TabsList>

          <TabsContent value="devotional" className="space-y-6">
            {isApiConfigured ? (
              <div>
                <h3 className="text-lg font-semibold mb-4">Devotional Videos & Bhajans</h3>
                {loading ? (
                  <div className="text-center py-8">Loading...</div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {devotionalContent.videos.map((video) => (
                      <VideoCard key={video.id} video={video} />
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12">
                <Youtube className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">YouTube Integration Not Configured</h3>
                <p className="text-gray-500 mb-4">Contact admin to configure YouTube Data API key for devotional content access.</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="music">
            <div>
              <h3 className="text-lg font-semibold mb-4">Spiritual Music & Mantras</h3>
              {loading ? (
                <div className="text-center py-8">Loading...</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {devotionalContent.music.map((video) => (
                    <VideoCard key={video.id} video={video} />
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="books">
            <div className="space-y-6">
              {/* Uploaded PDFs */}
              {uploadedPDFs.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">Uploaded Spiritual Books</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {uploadedPDFs.map((pdf, index) => (
                      <Card key={index} className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                          <CardTitle className="text-lg">{pdf.title}</CardTitle>
                          <CardDescription>by {pdf.author}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-gray-600 mb-4">{pdf.description}</p>
                          <div className="flex items-center justify-between">
                            <Badge>{pdf.category}</Badge>
                            <Button size="sm" variant="outline">
                              <Book className="h-4 w-4 mr-1" />
                              Read
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Default Books */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Sacred Texts Collection</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {staticBooks.map((book, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <CardTitle className="text-lg">{book.title}</CardTitle>
                        <CardDescription>by {book.author}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600 mb-4">{book.description}</p>
                        <div className="flex items-center justify-between">
                          <Badge>{book.category}</Badge>
                          <Button size="sm" variant="outline">
                            <Book className="h-4 w-4 mr-1" />
                            Read
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="search">
            {searchResults.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {searchResults.map((video) => (
                  <VideoCard key={video.id} video={video} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Search className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">No Search Results</h3>
                <p className="text-gray-500">Use the search bar above to find devotional content on YouTube.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MediaLibrary;
