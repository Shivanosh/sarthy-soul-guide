import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Search, Play, Book, Music, Video, Settings, Youtube, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';
import { youtubeService, YouTubeVideo } from '@/services/youtubeService';

const MediaLibrary = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [youtubeContent, setYoutubeContent] = useState<{
    meditations: YouTubeVideo[];
    bhajans: YouTubeVideo[];
    talks: YouTubeVideo[];
    yoga: YouTubeVideo[];
  }>({ meditations: [], bhajans: [], talks: [], yoga: [] });
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<YouTubeVideo[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<string>('');
  const [isApiConfigured, setIsApiConfigured] = useState(false);

  const staticBooks = [
    { title: 'Bhagavad Gita', author: 'Vyasa', description: 'Ancient wisdom on duty and righteousness', category: 'Scripture', url: '#' },
    { title: 'Ramayana', author: 'Valmiki', description: 'Epic tale of virtue and devotion', category: 'Epic', url: '#' },
    { title: 'The Upanishads', author: 'Various Sages', description: 'Philosophical insights into the nature of reality', category: 'Philosophy', url: '#' },
    { title: 'Yoga Sutras', author: 'Patanjali', description: 'A guide to yoga and meditation', category: 'Yoga', url: '#' },
    { title: 'Tao Te Ching', author: 'Lao Tzu', description: 'A classic text on Taoist philosophy', category: 'Philosophy', url: '#' },
    { title: 'The Dhammapada', author: 'Buddha', description: 'Verses on ethics and mindfulness', category: 'Buddhism', url: '#' }
  ];

  const staticMusic = [
    { title: 'Om Mani Padme Hum', artist: 'Traditional', description: 'Sacred Tibetan mantra', duration: '5:30' },
    { title: 'Gayatri Mantra', artist: 'Various Artists', description: 'Universal prayer for wisdom', duration: '3:45' },
    { title: 'Hare Krishna Mantra', artist: 'ISKCON', description: 'Devotional chant for Krishna', duration: '6:20' },
    { title: 'Shanti Mantra', artist: 'Deva Premal', description: 'Peaceful mantra for inner harmony', duration: '4:15' },
    { title: 'Guru Ram Das Raakho', artist: 'Snatam Kaur', description: 'Sikh chant for protection', duration: '7:00' },
    { title: 'Namo Amitabha', artist: 'Imee Ooi', description: 'Buddhist chant for compassion', duration: '5:50' }
  ];

  useEffect(() => {
    checkApiConfiguration();
    if (isApiConfigured) {
      loadSpiritualContent();
    }
  }, [isApiConfigured]);

  const checkApiConfiguration = () => {
    const settings = localStorage.getItem('adminSettings');
    if (settings) {
      const { youtubeApiKey } = JSON.parse(settings);
      setIsApiConfigured(!!youtubeApiKey);
    }
  };

  const loadSpiritualContent = async () => {
    if (!isApiConfigured) return;
    
    setLoading(true);
    try {
      const content = await youtubeService.getSpiritualContent();
      setYoutubeContent(content);
    } catch (error) {
      console.error('Error loading YouTube content:', error);
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
      const results = await youtubeService.searchVideos(searchTerm + ' spiritual meditation', 12);
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
          <Badge variant="outline" className="text-xs">Video</Badge>
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
              <h1 className="text-xl font-bold">Spiritual Media Library</h1>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {!isApiConfigured && (
              <Badge className="bg-yellow-500 text-white">
                API Not Configured
              </Badge>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/admin/settings')}
              className="text-white hover:bg-white/20"
            >
              <Settings className="h-4 w-4 mr-1" />
              Configure
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        {/* Search Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Search className="mr-2 h-5 w-5" />
              Search Spiritual Content
            </CardTitle>
            <CardDescription>
              {isApiConfigured ? 
                'Search YouTube for meditation, spiritual talks, and devotional content' :
                'YouTube API not configured. Please contact admin to enable video search.'
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-2">
              <Input
                placeholder="Search for meditation, bhajans, spiritual talks..."
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
        <Tabs defaultValue="videos" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="videos">YouTube Videos</TabsTrigger>
            <TabsTrigger value="books">Sacred Texts</TabsTrigger>
            <TabsTrigger value="music">Devotional Music</TabsTrigger>
            <TabsTrigger value="search">Search Results</TabsTrigger>
          </TabsList>

          <TabsContent value="videos" className="space-y-6">
            {isApiConfigured ? (
              <>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Guided Meditations</h3>
                  {loading ? (
                    <div className="text-center py-8">Loading...</div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                      {youtubeContent.meditations.map((video) => (
                        <VideoCard key={video.id} video={video} />
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Bhajans & Kirtans</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {youtubeContent.bhajans.map((video) => (
                      <VideoCard key={video.id} video={video} />
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Spiritual Talks</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {youtubeContent.talks.map((video) => (
                      <VideoCard key={video.id} video={video} />
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Yoga & Pranayama</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {youtubeContent.yoga.map((video) => (
                      <VideoCard key={video.id} video={video} />
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <Youtube className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">YouTube Integration Not Configured</h3>
                <p className="text-gray-500 mb-4">Ask your admin to configure the YouTube Data API key to access video content.</p>
                <Button onClick={() => navigate('/admin/settings')} variant="outline">
                  Go to Settings
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="books">
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
          </TabsContent>

          <TabsContent value="music">
            <div className="space-y-4">
              {staticMusic.map((track, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">{track.title}</h3>
                        <p className="text-sm text-gray-600">{track.artist}</p>
                        <p className="text-xs text-gray-500">{track.description}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500">{track.duration}</span>
                        <Button size="sm">
                          <Play className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
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
                <p className="text-gray-500">Use the search bar above to find spiritual content on YouTube.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MediaLibrary;
