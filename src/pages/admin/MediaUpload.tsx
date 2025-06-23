
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Upload, BookOpen, Music, Image, FileText, File } from 'lucide-react';
import { toast } from 'sonner';

const MediaUpload = () => {
  const navigate = useNavigate();
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    mediaType: '',
    author: '',
    language: 'Hindi',
    tags: ''
  });

  const mediaTypes = [
    { value: 'book', label: 'Spiritual Book', icon: BookOpen },
    { value: 'pdf', label: 'PDF Document', icon: FileText },
    { value: 'audio', label: 'Audio/Music', icon: Music },
    { value: 'image', label: 'Image', icon: Image },
    { value: 'document', label: 'Document', icon: File }
  ];

  const categories = [
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

  const languages = [
    'Hindi',
    'English',
    'Sanskrit',
    'Tamil',
    'Telugu',
    'Bengali',
    'Marathi',
    'Gujarati',
    'Kannada',
    'Malayalam',
    'Punjabi',
    'Other'
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.mediaType || !formData.category) {
      toast.error('Please fill in all required fields');
      return;
    }

    setUploading(true);

    try {
      // Simulate file upload process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock upload success
      const uploadedContent = {
        id: Date.now(),
        ...formData,
        uploadDate: new Date().toISOString(),
        uploadedBy: 'admin',
        status: 'active'
      };

      // Store in localStorage for demo purposes
      const existingContent = JSON.parse(localStorage.getItem('mediaLibrary') || '[]');
      existingContent.push(uploadedContent);
      localStorage.setItem('mediaLibrary', JSON.stringify(existingContent));

      toast.success(`${formData.mediaType === 'pdf' ? 'PDF book' : 'Content'} uploaded successfully!`);
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        category: '',
        mediaType: '',
        author: '',
        language: 'Hindi',
        tags: ''
      });

    } catch (error) {
      toast.error('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const getMediaIcon = (type: string) => {
    const mediaType = mediaTypes.find(mt => mt.value === type);
    return mediaType?.icon || File;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md shadow-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
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
              <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Media Upload</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
            <CardHeader className="text-center pb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Upload className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl sm:text-3xl font-bold text-gray-800">Upload Content</CardTitle>
              <CardDescription className="text-base sm:text-lg text-gray-600">
                Add books, PDFs, audio, and other spiritual resources to the library
              </CardDescription>
            </CardHeader>

            <CardContent className="px-6 sm:px-8 pb-8">
              <form onSubmit={handleFileUpload} className="space-y-6">
                {/* Media Type Selection */}
                <div className="space-y-2">
                  <Label className="text-base font-semibold text-gray-700">Content Type *</Label>
                  <Select value={formData.mediaType} onValueChange={(value) => handleInputChange('mediaType', value)}>
                    <SelectTrigger className="w-full h-12 text-base border-2 border-gray-200 focus:border-red-400">
                      <SelectValue placeholder="Select content type" />
                    </SelectTrigger>
                    <SelectContent>
                      {mediaTypes.map((type) => {
                        const Icon = type.icon;
                        return (
                          <SelectItem key={type.value} value={type.value} className="py-3">
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

                {/* Title */}
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-base font-semibold text-gray-700">Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="Enter content title"
                    className="h-12 text-base border-2 border-gray-200 focus:border-red-400"
                    required
                  />
                </div>

                {/* Author (for books and PDFs) */}
                {(formData.mediaType === 'book' || formData.mediaType === 'pdf') && (
                  <div className="space-y-2">
                    <Label htmlFor="author" className="text-base font-semibold text-gray-700">Author</Label>
                    <Input
                      id="author"
                      value={formData.author}
                      onChange={(e) => handleInputChange('author', e.target.value)}
                      placeholder="Enter author name"
                      className="h-12 text-base border-2 border-gray-200 focus:border-red-400"
                    />
                  </div>
                )}

                {/* Category */}
                <div className="space-y-2">
                  <Label className="text-base font-semibold text-gray-700">Category *</Label>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                    <SelectTrigger className="w-full h-12 text-base border-2 border-gray-200 focus:border-red-400">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent className="max-h-60">
                      {categories.map((category) => (
                        <SelectItem key={category} value={category} className="py-2">
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Language */}
                <div className="space-y-2">
                  <Label className="text-base font-semibold text-gray-700">Language</Label>
                  <Select value={formData.language} onValueChange={(value) => handleInputChange('language', value)}>
                    <SelectTrigger className="w-full h-12 text-base border-2 border-gray-200 focus:border-red-400">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="max-h-60">
                      {languages.map((language) => (
                        <SelectItem key={language} value={language} className="py-2">
                          {language}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-base font-semibold text-gray-700">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Enter content description..."
                    className="min-h-24 text-base border-2 border-gray-200 focus:border-red-400 resize-none"
                    rows={4}
                  />
                </div>

                {/* Tags */}
                <div className="space-y-2">
                  <Label htmlFor="tags" className="text-base font-semibold text-gray-700">Tags</Label>
                  <Input
                    id="tags"
                    value={formData.tags}
                    onChange={(e) => handleInputChange('tags', e.target.value)}
                    placeholder="Enter tags separated by commas"
                    className="h-12 text-base border-2 border-gray-200 focus:border-red-400"
                  />
                  <p className="text-sm text-gray-500">Separate multiple tags with commas (e.g., spiritual, meditation, peace)</p>
                </div>

                {/* File Upload Area */}
                <div className="space-y-2">
                  <Label className="text-base font-semibold text-gray-700">Upload File *</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-red-400 transition-colors">
                    {formData.mediaType && (
                      <div className="mb-4">
                        {React.createElement(getMediaIcon(formData.mediaType), { 
                          className: "h-12 w-12 mx-auto text-gray-400" 
                        })}
                      </div>
                    )}
                    <p className="text-base text-gray-600 mb-2">
                      {formData.mediaType === 'pdf' ? 'Drop your PDF file here or click to browse' :
                       formData.mediaType === 'book' ? 'Upload book file (PDF, EPUB, etc.)' :
                       formData.mediaType === 'audio' ? 'Upload audio file (MP3, WAV, etc.)' :
                       formData.mediaType === 'image' ? 'Upload image file (JPG, PNG, etc.)' :
                       'Select a file to upload'}
                    </p>
                    <Input
                      type="file"
                      className="hidden"
                      id="file-upload"
                      accept={
                        formData.mediaType === 'pdf' ? '.pdf' :
                        formData.mediaType === 'book' ? '.pdf,.epub,.mobi' :
                        formData.mediaType === 'audio' ? '.mp3,.wav,.ogg' :
                        formData.mediaType === 'image' ? '.jpg,.jpeg,.png,.gif' :
                        '*'
                      }
                    />
                    <Button
                      type="button"
                      variant="outline"
                      className="mt-2"
                      onClick={() => document.getElementById('file-upload')?.click()}
                    >
                      Choose File
                    </Button>
                  </div>
                </div>

                {/* Submit Button */}
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 h-12 text-lg font-semibold shadow-lg"
                  disabled={uploading}
                >
                  {uploading ? 'Uploading...' : `Upload ${formData.mediaType === 'pdf' ? 'PDF' : 'Content'}`}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Upload Tips */}
          <Card className="mt-6 bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
            <CardContent className="p-6">
              <h3 className="font-semibold text-blue-800 mb-3 flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Upload Guidelines
              </h3>
              <ul className="text-sm text-blue-700 space-y-2">
                <li>• PDF books should be under 50MB for optimal performance</li>
                <li>• Use descriptive titles and detailed descriptions for better discoverability</li>
                <li>• Add relevant tags to help users find content easily</li>
                <li>• Ensure content is appropriate for spiritual and educational purposes</li>
                <li>• Audio files should be high quality (preferably 320kbps or higher)</li>
                <li>• Images should be at least 800x600 pixels for clear viewing</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default MediaUpload;
