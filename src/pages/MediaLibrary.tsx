
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Search, BookOpen, Download, Play, Eye, Filter, FileText, Music, Image, File } from 'lucide-react';
import { toast } from 'sonner';

interface MediaItem {
  id: number;
  title: string;
  description: string;
  category: string;
  mediaType: string;
  author?: string;
  language: string;
  tags: string;
  uploadDate: string;
  status: string;
}

const MediaLibrary = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);

  useEffect(() => {
    // Load media items from localStorage (demo data)
    const storedItems = JSON.parse(localStorage.getItem('mediaLibrary') || '[]');
    
    // Add some default items if none exist
    if (storedItems.length === 0) {
      const defaultItems: MediaItem[] = [
        {
          id: 1,
          title: 'Bhagavad Gita Complete',
          description: 'Complete Sanskrit text with Hindi translation and commentary',
          category: 'Bhagavad Gita',
          mediaType: 'pdf',
          author: 'Sage Vyasa',
          language: 'Hindi',
          tags: 'gita, krishna, spirituality, philosophy',
          uploadDate: new Date().toISOString(),
          status: 'active'
        },
        {
          id: 2,
          title: 'Hanuman Chalisa Audio',
          description: 'Beautiful recitation of Hanuman Chalisa with music',
          category: 'Devotional Songs',
          mediaType: 'audio',
          author: 'Traditional',
          language: 'Hindi',
          tags: 'hanuman, devotional, prayer',
          uploadDate: new Date().toISOString(),
          status: 'active'
        },
        {
          id: 3,
          title: 'Meditation Guide for Beginners',
          description: 'Complete guide to starting your meditation practice',
          category: 'Meditation Guides',
          mediaType: 'pdf',
          author: 'Spiritual Masters',
          language: 'English',
          tags: 'meditation, beginner, mindfulness',
          uploadDate: new Date().toISOString(),
          status: 'active'
        }
      ];
      
      localStorage.setItem('mediaLibrary', JSON.stringify(defaultItems));
      setMediaItems(defaultItems);
    } else {
      setMediaItems(storedItems);
    }
  }, []);

  const categories = [
    'all',
    'Vedic Literature',
    'Bhagavad Gita',
    'Ramayana',
    'Mahabharata',
    'Puranas',
    'Upanishads',
    'Devotional Songs',
    'Mantras',
    'Spiritual Guidance',
    'Temple Information',
    'Ritual Guides',
    'Meditation Guides',
    'Philosophy',
    'History',
    'Other'
  ];

  const mediaTypes = [
    { value: 'all', label: 'All Types', icon: File },
    { value: 'book', label: 'Books', icon: BookOpen },
    { value: 'pdf', label: 'PDF Documents', icon: FileText },
    { value: 'audio', label: 'Audio', icon: Music },
    { value: 'image', label: 'Images', icon: Image }
  ];

  const filteredItems = mediaItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.tags.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (item.author && item.author.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesType = selectedType === 'all' || item.mediaType === selectedType;
    
    return matchesSearch && matchesCategory && matchesType;
  });

  const getMediaIcon = (type: string) => {
    switch (type) {
      case 'book':
      case 'pdf':
        return BookOpen;
      case 'audio':
        return Music;
      case 'image':
        return Image;
      default:
        return File;
    }
  };

  const getMediaColor = (type: string) => {
    switch (type) {
      case 'book':
      case 'pdf':
        return 'from-blue-500 to-blue-600';
      case 'audio':
        return 'from-green-500 to-green-600';
      case 'image':
        return 'from-purple-500 to-purple-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  const handleDownload = (item: MediaItem) => {
    toast.success(`Downloading ${item.title}...`);
    // Simulate download
  };

  const handleView = (item: MediaItem) => {
    if (item.mediaType === 'pdf' || item.mediaType === 'book') {
      toast.success(`Opening ${item.title} in viewer...`);
    } else if (item.mediaType === 'audio') {
      toast.success(`Playing ${item.title}...`);
    } else {
      toast.success(`Viewing ${item.title}...`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md shadow-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
              className="text-gray-600 hover:text-gray-800 hover:bg-gray-100 p-2"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Home
            </Button>
            <div className="flex items-center space-x-3">
              <img 
                src="/lovable-uploads/e81fabc3-1be6-4500-afbd-503816b027c1.png" 
                alt="AapkaSarthy Logo" 
                className="h-8 w-8 sm:h-10 sm:w-10 object-contain"
              />
              <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Media Library</h1>
            </div>
          </div>
          
          <div className="text-right">
            <p className="text-sm text-gray-600">{filteredItems.length} resources available</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Search and Filters */}
        <Card className="mb-6 sm:mb-8 shadow-lg border-2 border-gray-200">
          <CardContent className="p-4 sm:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Search */}
              <div className="sm:col-span-2 lg:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search books, audio, documents..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 h-11 text-base border-2 border-gray-200 focus:border-blue-400"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="h-11 text-base border-2 border-gray-200 focus:border-blue-400">
                    <div className="flex items-center space-x-2">
                      <Filter className="h-4 w-4" />
                      <SelectValue placeholder="Category" />
                    </div>
                  </SelectTrigger>
                  <SelectContent className="max-h-60">
                    {categories.map((category) => (
                      <SelectItem key={category} value={category} className="py-2 capitalize">
                        {category === 'all' ? 'All Categories' : category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Type Filter */}
              <div>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="h-11 text-base border-2 border-gray-200 focus:border-blue-400">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {mediaTypes.map((type) => {
                      const Icon = type.icon;
                      return (
                        <SelectItem key={type.value} value={type.value} className="py-2">
                          <div className="flex items-center space-x-2">
                            <Icon className="h-4 w-4" />
                            <span>{type.label}</span>
                          </div>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        {filteredItems.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <BookOpen className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No resources found</h3>
              <p className="text-gray-500 mb-4">Try adjusting your search terms or filters</p>
              <Button variant="outline" onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setSelectedType('all');
              }}>
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {filteredItems.map((item) => {
              const MediaIcon = getMediaIcon(item.mediaType);
              const colorClass = getMediaColor(item.mediaType);
              
              return (
                <Card key={item.id} className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-blue-300 overflow-hidden">
                  <CardHeader className="pb-3">
                    <div className={`w-12 h-12 bg-gradient-to-r ${colorClass} rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200`}>
                      <MediaIcon className="h-6 w-6 text-white" />
                    </div>
                    
                    <CardTitle className="text-base sm:text-lg font-bold text-gray-800 line-clamp-2 leading-tight">
                      {item.title}
                    </CardTitle>
                    
                    {item.author && (
                      <p className="text-sm text-gray-600 font-medium">by {item.author}</p>
                    )}
                  </CardHeader>

                  <CardContent className="space-y-3">
                    <CardDescription className="text-sm text-gray-600 line-clamp-3 leading-relaxed">
                      {item.description}
                    </CardDescription>

                    <div className="flex flex-wrap gap-1">
                      <Badge variant="secondary" className="text-xs px-2 py-1 bg-blue-100 text-blue-800">
                        {item.category}
                      </Badge>
                      <Badge variant="outline" className="text-xs px-2 py-1 border-green-300 text-green-700">
                        {item.language}
                      </Badge>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2 pt-2">
                      <Button 
                        size="sm" 
                        onClick={() => handleView(item)}
                        className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium h-9"
                      >
                        {item.mediaType === 'audio' ? (
                          <>
                            <Play className="h-3 w-3 mr-1" />
                            Play
                          </>
                        ) : (
                          <>
                            <Eye className="h-3 w-3 mr-1" />
                            View
                          </>
                        )}
                      </Button>
                      
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => handleDownload(item)}
                        className="flex-1 border-green-500 text-green-600 hover:bg-green-50 hover:text-green-700 font-medium h-9"
                      >
                        <Download className="h-3 w-3 mr-1" />
                        Download
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};

export default MediaLibrary;
