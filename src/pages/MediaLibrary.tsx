
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, BookOpen, Play, Search, Filter, Music, Mic2, Volume2 } from 'lucide-react';

const MediaLibrary = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLanguage, setSelectedLanguage] = useState('all');

  const mediaContent = [
    {
      id: 1,
      title: 'Hanuman Chalisa',
      type: 'chant',
      language: 'Hindi',
      duration: '15:30',
      mood: 'strength',
      description: 'Traditional chant for courage and strength',
      artist: 'Pandit Jasraj'
    },
    {
      id: 2,
      title: 'Om Namah Shivaya',
      type: 'mantra',
      language: 'Sanskrit',
      duration: '21:00',
      mood: 'peaceful',
      description: 'Sacred mantra for inner peace',
      artist: 'Spiritual Voices'
    },
    {
      id: 3,
      title: 'Bhajan Sandhya',
      type: 'bhajan',
      language: 'Hindi',
      duration: '45:20',
      mood: 'devotional',
      description: 'Evening devotional songs collection',
      artist: 'Various Artists'
    },
    {
      id: 4,
      title: 'Gayatri Mantra',
      type: 'mantra',
      language: 'Sanskrit',
      duration: '8:15',
      mood: 'wisdom',
      description: 'Most powerful Vedic mantra for enlightenment',
      artist: 'Vedic Chanters'
    },
    {
      id: 5,
      title: 'Krishna Bhajans',
      type: 'bhajan',
      language: 'Hindi',
      duration: '32:45',
      mood: 'joyful',
      description: 'Beautiful songs dedicated to Lord Krishna',
      artist: 'Anup Jalota'
    },
    {
      id: 6,
      title: 'Meditation Music',
      type: 'instrumental',
      language: 'Universal',
      duration: '60:00',
      mood: 'relaxing',
      description: 'Peaceful instrumental music for meditation',
      artist: 'Spiritual Sounds'
    },
    {
      id: 7,
      title: 'Maha Mantra',
      type: 'chant',
      language: 'Sanskrit',
      duration: '16:40',
      mood: 'uplifting',
      description: 'Hare Krishna Maha Mantra chanting',
      artist: 'ISKCON Devotees'
    },
    {
      id: 8,
      title: 'Shiva Aarti',
      type: 'aarti',
      language: 'Hindi',
      duration: '7:30',
      mood: 'devotional',
      description: 'Traditional evening aarti for Lord Shiva',
      artist: 'Temple Singers'
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'bhajan': return <Music className="h-4 w-4" />;
      case 'mantra': return <Volume2 className="h-4 w-4" />;
      case 'chant': return <Mic2 className="h-4 w-4" />;
      default: return <Play className="h-4 w-4" />;
    }
  };

  const getMoodColor = (mood: string) => {
    const colors = {
      peaceful: 'bg-blue-100 text-blue-800',
      joyful: 'bg-yellow-100 text-yellow-800',
      devotional: 'bg-purple-100 text-purple-800',
      strength: 'bg-red-100 text-red-800',
      wisdom: 'bg-green-100 text-green-800',
      relaxing: 'bg-indigo-100 text-indigo-800',
      uplifting: 'bg-pink-100 text-pink-800'
    };
    return colors[mood as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const filteredContent = mediaContent.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.artist.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.type === selectedCategory;
    const matchesLanguage = selectedLanguage === 'all' || item.language === selectedLanguage;
    
    return matchesSearch && matchesCategory && matchesLanguage;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4">
        <div className="max-w-6xl mx-auto flex items-center space-x-4">
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
            <BookOpen className="h-6 w-6" />
            <h1 className="text-xl font-bold">Spiritual Media Library</h1>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search bhajans, mantras, artists..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="bhajan">Bhajans</SelectItem>
                <SelectItem value="mantra">Mantras</SelectItem>
                <SelectItem value="chant">Chants</SelectItem>
                <SelectItem value="aarti">Aartis</SelectItem>
                <SelectItem value="instrumental">Instrumental</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Languages</SelectItem>
                <SelectItem value="Hindi">Hindi</SelectItem>
                <SelectItem value="Sanskrit">Sanskrit</SelectItem>
                <SelectItem value="Universal">Universal</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredContent.map((item) => (
            <Card key={item.id} className="hover:shadow-lg transition-all duration-300 group">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    {getTypeIcon(item.type)}
                    <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
                      {item.title}
                    </CardTitle>
                  </div>
                  <Badge className={getMoodColor(item.mood)}>
                    {item.mood}
                  </Badge>
                </div>
                <CardDescription className="text-sm text-gray-600">
                  {item.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>{item.artist}</span>
                    <span>{item.duration}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs">
                      {item.language}
                    </Badge>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="hover:bg-blue-50">
                        <Play className="h-3 w-3 mr-1" />
                        Play
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredContent.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No content found</h3>
            <p className="text-gray-500">Try adjusting your search or filters</p>
          </div>
        )}

        {/* Stats */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600">108</div>
              <div className="text-sm text-gray-600">Total Tracks</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">15</div>
              <div className="text-sm text-gray-600">Languages</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">42</div>
              <div className="text-sm text-gray-600">Artists</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-600">24/7</div>
              <div className="text-sm text-gray-600">Available</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaLibrary;
