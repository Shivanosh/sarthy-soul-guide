
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Settings, Eye, EyeOff, Save, Key, Youtube } from 'lucide-react';
import { toast } from 'sonner';

const AdminSettings = () => {
  const navigate = useNavigate();
  const [showOpenAIKey, setShowOpenAIKey] = useState(false);
  const [showYouTubeKey, setShowYouTubeKey] = useState(false);
  const [settings, setSettings] = useState({
    openaiApiKey: '',
    youtubeApiKey: '',
    naradPersonality: 'You are Narad AI, a wise spiritual guide who helps with meditation and provides astrological insights. Be compassionate, insightful, and spiritually minded in your responses.',
    meditationPrompts: 'Provide guided meditation instructions and breathing exercises.',
    astrologyPrompts: 'Offer astrological insights and guidance based on user queries.'
  });

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = () => {
    const savedSettings = localStorage.getItem('adminSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  };

  const saveSettings = () => {
    localStorage.setItem('adminSettings', JSON.stringify(settings));
    toast.success('Settings saved successfully!');
  };

  const handleChange = (field: string, value: string) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const testOpenAIConnection = async () => {
    if (!settings.openaiApiKey) {
      toast.error('Please enter OpenAI API key first');
      return;
    }

    try {
      const response = await fetch('https://api.openai.com/v1/models', {
        headers: {
          'Authorization': `Bearer ${settings.openaiApiKey}`
        }
      });

      if (response.ok) {
        toast.success('OpenAI API connection successful!');
      } else {
        toast.error('Invalid OpenAI API key');
      }
    } catch (error) {
      toast.error('Failed to test OpenAI connection');
    }
  };

  const testYouTubeConnection = async () => {
    if (!settings.youtubeApiKey) {
      toast.error('Please enter YouTube API key first');
      return;
    }

    try {
      const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=meditation&type=video&maxResults=1&key=${settings.youtubeApiKey}`);
      
      if (response.ok) {
        toast.success('YouTube API connection successful!');
      } else {
        toast.error('Invalid YouTube API key');
      }
    } catch (error) {
      toast.error('Failed to test YouTube connection');
    }
  };

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
              Back to Dashboard
            </Button>
            <div className="flex items-center space-x-2">
              <Settings className="h-6 w-6" />
              <h1 className="text-xl font-bold">Admin Settings</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* API Keys Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Key className="mr-2 h-5 w-5" />
              API Configuration
            </CardTitle>
            <CardDescription>
              Configure API keys for NaradAI chatbot and YouTube integration
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* OpenAI API Key */}
            <div className="space-y-2">
              <Label htmlFor="openaiKey">OpenAI API Key</Label>
              <div className="flex space-x-2">
                <div className="relative flex-1">
                  <Input
                    id="openaiKey"
                    type={showOpenAIKey ? "text" : "password"}
                    value={settings.openaiApiKey}
                    onChange={(e) => handleChange('openaiApiKey', e.target.value)}
                    placeholder="sk-..."
                    className="pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowOpenAIKey(!showOpenAIKey)}
                  >
                    {showOpenAIKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                <Button onClick={testOpenAIConnection} variant="outline">
                  Test Connection
                </Button>
              </div>
            </div>

            {/* YouTube API Key */}
            <div className="space-y-2">
              <Label htmlFor="youtubeKey">YouTube Data API Key</Label>
              <div className="flex space-x-2">
                <div className="relative flex-1">
                  <Input
                    id="youtubeKey"
                    type={showYouTubeKey ? "text" : "password"}
                    value={settings.youtubeApiKey}
                    onChange={(e) => handleChange('youtubeApiKey', e.target.value)}
                    placeholder="AIza..."
                    className="pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowYouTubeKey(!showYouTubeKey)}
                  >
                    {showYouTubeKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                <Button onClick={testYouTubeConnection} variant="outline">
                  <Youtube className="h-4 w-4 mr-1" />
                  Test
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* NaradAI Configuration */}
        <Card>
          <CardHeader>
            <CardTitle>NaradAI Personality & Prompts</CardTitle>
            <CardDescription>
              Customize how NaradAI responds and behaves
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="personality">AI Personality</Label>
              <Textarea
                id="personality"
                value={settings.naradPersonality}
                onChange={(e) => handleChange('naradPersonality', e.target.value)}
                placeholder="Define how NaradAI should behave..."
                className="min-h-[80px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="meditation">Meditation Guidance Prompts</Label>
              <Textarea
                id="meditation"
                value={settings.meditationPrompts}
                onChange={(e) => handleChange('meditationPrompts', e.target.value)}
                placeholder="Instructions for meditation guidance..."
                className="min-h-[60px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="astrology">Astrology Guidance Prompts</Label>
              <Textarea
                id="astrology"
                value={settings.astrologyPrompts}
                onChange={(e) => handleChange('astrologyPrompts', e.target.value)}
                placeholder="Instructions for astrological advice..."
                className="min-h-[60px]"
              />
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button onClick={saveSettings} className="bg-gradient-to-r from-orange-500 to-green-500">
            <Save className="h-4 w-4 mr-2" />
            Save Settings
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
