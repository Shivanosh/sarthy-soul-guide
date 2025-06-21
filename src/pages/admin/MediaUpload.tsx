
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Upload, File, Music, Trash2, Eye } from 'lucide-react';
import { toast } from 'sonner';

const MediaUpload = () => {
  const navigate = useNavigate();
  const [uploadForm, setUploadForm] = useState({
    title: '',
    artist: '',
    type: '',
    language: '',
    mood: '',
    description: '',
    duration: '',
    file: null as File | null
  });

  const [uploadedFiles, setUploadedFiles] = useState([
    {
      id: 1,
      title: 'New Bhajan Upload',
      artist: 'Temple Artist',
      type: 'bhajan',
      status: 'uploaded',
      uploadDate: '2024-06-21'
    }
  ]);

  const handleFormChange = (field: string, value: string) => {
    setUploadForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadForm(prev => ({
        ...prev,
        file: file
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!uploadForm.file) {
      toast.error('Please select a file to upload');
      return;
    }

    // Mock upload process
    toast.success('Media uploaded successfully!');
    
    const newFile = {
      id: Date.now(),
      title: uploadForm.title,
      artist: uploadForm.artist,
      type: uploadForm.type,
      status: 'uploaded',
      uploadDate: new Date().toISOString().split('T')[0]
    };
    
    setUploadedFiles(prev => [newFile, ...prev]);
    
    // Reset form
    setUploadForm({
      title: '',
      artist: '',
      type: '',
      language: '',
      mood: '',
      description: '',
      duration: '',
      file: null
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white p-4">
        <div className="max-w-6xl mx-auto flex items-center space-x-4">
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
            <Upload className="h-6 w-6" />
            <h1 className="text-xl font-bold">Media Upload Center</h1>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-orange-800">Upload New Content</CardTitle>
                <CardDescription>Add spiritual content to the library</CardDescription>
              </CardHeader>
              
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      value={uploadForm.title}
                      onChange={(e) => handleFormChange('title', e.target.value)}
                      placeholder="Enter content title"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="artist">Artist/Creator *</Label>
                    <Input
                      id="artist"
                      value={uploadForm.artist}
                      onChange={(e) => handleFormChange('artist', e.target.value)}
                      placeholder="Artist or creator name"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="type">Content Type *</Label>
                      <Select value={uploadForm.type} onValueChange={(value) => handleFormChange('type', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="bhajan">Bhajan</SelectItem>
                          <SelectItem value="mantra">Mantra</SelectItem>
                          <SelectItem value="chant">Chant</SelectItem>
                          <SelectItem value="aarti">Aarti</SelectItem>
                          <SelectItem value="instrumental">Instrumental</SelectItem>
                          <SelectItem value="meditation">Meditation</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="language">Language *</Label>
                      <Select value={uploadForm.language} onValueChange={(value) => handleFormChange('language', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Hindi">Hindi</SelectItem>
                          <SelectItem value="Sanskrit">Sanskrit</SelectItem>
                          <SelectItem value="English">English</SelectItem>
                          <SelectItem value="Bengali">Bengali</SelectItem>
                          <SelectItem value="Tamil">Tamil</SelectItem>
                          <SelectItem value="Universal">Universal</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="mood">Mood Tag *</Label>
                      <Select value={uploadForm.mood} onValueChange={(value) => handleFormChange('mood', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select mood" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="peaceful">Peaceful</SelectItem>
                          <SelectItem value="joyful">Joyful</SelectItem>
                          <SelectItem value="devotional">Devotional</SelectItem>
                          <SelectItem value="energetic">Energetic</SelectItem>
                          <SelectItem value="meditative">Meditative</SelectItem>
                          <SelectItem value="healing">Healing</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="duration">Duration</Label>
                      <Input
                        id="duration"
                        value={uploadForm.duration}
                        onChange={(e) => handleFormChange('duration', e.target.value)}
                        placeholder="e.g., 15:30"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={uploadForm.description}
                      onChange={(e) => handleFormChange('description', e.target.value)}
                      placeholder="Brief description of the content"
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="file">Audio File *</Label>
                    <div className="mt-2">
                      <input
                        type="file"
                        id="file"
                        accept="audio/*"
                        onChange={handleFileChange}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
                        required
                      />
                    </div>
                    {uploadForm.file && (
                      <div className="mt-2 flex items-center text-sm text-green-600">
                        <File className="h-4 w-4 mr-2" />
                        {uploadForm.file.name}
                      </div>
                    )}
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Content
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Recent Uploads */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-orange-800">Recent Uploads</CardTitle>
                <CardDescription>Recently uploaded content</CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  {uploadedFiles.map((file) => (
                    <div key={file.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Music className="h-8 w-8 text-orange-500" />
                        <div>
                          <h4 className="font-medium">{file.title}</h4>
                          <p className="text-sm text-gray-600">{file.artist}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                              {file.type}
                            </Badge>
                            <span className="text-xs text-gray-500">{file.uploadDate}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Upload Stats */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg text-orange-800">Upload Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">24</div>
                    <div className="text-sm text-gray-600">This Month</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-600">108</div>
                    <div className="text-sm text-gray-600">Total Uploads</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaUpload;
