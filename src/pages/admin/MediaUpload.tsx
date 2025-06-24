
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Upload, FileText, Image, Music, Video, Save, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface UploadedFile {
  id: string;
  title: string;
  author: string;
  description: string;
  category: string;
  type: 'pdf' | 'image' | 'audio' | 'video';
  fileName: string;
  uploadDate: string;
  fileUrl: string;
}

const MediaUpload = () => {
  const navigate = useNavigate();
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: '',
    category: '',
    type: 'pdf'
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  React.useEffect(() => {
    loadUploadedFiles();
  }, []);

  const loadUploadedFiles = () => {
    const savedFiles = localStorage.getItem('uploadedPDFs');
    if (savedFiles) {
      setUploadedFiles(JSON.parse(savedFiles));
    }
  };

  const saveUploadedFiles = (files: UploadedFile[]) => {
    localStorage.setItem('uploadedPDFs', JSON.stringify(files));
    setUploadedFiles(files);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      // Auto-fill title with filename (without extension)
      const fileName = file.name.replace(/\.[^/.]+$/, "");
      setFormData(prev => ({ ...prev, title: fileName }));
    }
  };

  const handleFormChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleUpload = () => {
    if (!selectedFile) {
      toast.error('Please select a file to upload');
      return;
    }

    if (!formData.title || !formData.author || !formData.category) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Create a URL for the file (in real app, this would be uploaded to server)
    const fileUrl = URL.createObjectURL(selectedFile);
    
    const newFile: UploadedFile = {
      id: Date.now().toString(),
      title: formData.title,
      author: formData.author,
      description: formData.description,
      category: formData.category,
      type: formData.type as 'pdf' | 'image' | 'audio' | 'video',
      fileName: selectedFile.name,
      uploadDate: new Date().toISOString(),
      fileUrl
    };

    const updatedFiles = [...uploadedFiles, newFile];
    saveUploadedFiles(updatedFiles);

    // Reset form
    setFormData({
      title: '',
      author: '',
      description: '',
      category: '',
      type: 'pdf'
    });
    setSelectedFile(null);
    
    // Reset file input
    const fileInput = document.getElementById('file-upload') as HTMLInputElement;
    if (fileInput) fileInput.value = '';

    toast.success('File uploaded successfully!');
  };

  const handleDelete = (id: string) => {
    const updatedFiles = uploadedFiles.filter(file => file.id !== id);
    saveUploadedFiles(updatedFiles);
    toast.success('File deleted successfully');
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf': return <FileText className="h-5 w-5 text-red-500" />;
      case 'image': return <Image className="h-5 w-5 text-blue-500" />;
      case 'audio': return <Music className="h-5 w-5 text-green-500" />;
      case 'video': return <Video className="h-5 w-5 text-purple-500" />;
      default: return <FileText className="h-5 w-5 text-gray-500" />;
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
              onClick={() => navigate('/admin/dashboard')}
              className="text-white hover:bg-white/20"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            <div className="flex items-center space-x-2">
              <Upload className="h-6 w-6" />
              <h1 className="text-xl font-bold">Media Upload</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6 space-y-8">
        {/* Upload Form */}
        <Card>
          <CardHeader>
            <CardTitle>Upload Spiritual Content</CardTitle>
            <CardDescription>
              Upload PDFs, images, audio, or video files for the spiritual library
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="file-upload">Select File</Label>
              <Input
                id="file-upload"
                type="file"
                onChange={handleFileSelect}
                accept=".pdf,.jpg,.jpeg,.png,.gif,.mp3,.wav,.mp4,.mov"
                className="cursor-pointer"
              />
              {selectedFile && (
                <p className="text-sm text-gray-600">
                  Selected: {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleFormChange('title', e.target.value)}
                  placeholder="Enter title"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="author">Author *</Label>
                <Input
                  id="author"
                  value={formData.author}
                  onChange={(e) => handleFormChange('author', e.target.value)}
                  placeholder="Enter author name"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select value={formData.category} onValueChange={(value) => handleFormChange('category', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="scripture">Scripture</SelectItem>
                    <SelectItem value="philosophy">Philosophy</SelectItem>
                    <SelectItem value="meditation">Meditation</SelectItem>
                    <SelectItem value="yoga">Yoga</SelectItem>
                    <SelectItem value="devotional">Devotional</SelectItem>
                    <SelectItem value="spiritual-guide">Spiritual Guide</SelectItem>
                    <SelectItem value="mantra">Mantra</SelectItem>
                    <SelectItem value="epic">Epic</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Content Type</Label>
                <Select value={formData.type} onValueChange={(value) => handleFormChange('type', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">PDF Document</SelectItem>
                    <SelectItem value="image">Image</SelectItem>
                    <SelectItem value="audio">Audio</SelectItem>
                    <SelectItem value="video">Video</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleFormChange('description', e.target.value)}
                placeholder="Enter description"
                className="min-h-[80px]"
              />
            </div>

            <Button onClick={handleUpload} className="w-full bg-gradient-to-r from-orange-500 to-green-500">
              <Save className="h-4 w-4 mr-2" />
              Upload Content
            </Button>
          </CardContent>
        </Card>

        {/* Uploaded Files List */}
        <Card>
          <CardHeader>
            <CardTitle>Uploaded Content ({uploadedFiles.length})</CardTitle>
            <CardDescription>
              Manage your uploaded spiritual content
            </CardDescription>
          </CardHeader>
          <CardContent>
            {uploadedFiles.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No files uploaded yet. Upload your first spiritual content above.
              </div>
            ) : (
              <div className="space-y-4">
                {uploadedFiles.map((file) => (
                  <div key={file.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      {getFileIcon(file.type)}
                      <div>
                        <h3 className="font-semibold">{file.title}</h3>
                        <p className="text-sm text-gray-600">by {file.author}</p>
                        <p className="text-xs text-gray-500">
                          {file.category} • {new Date(file.uploadDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => window.open(file.fileUrl, '_blank')}
                      >
                        View
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(file.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MediaUpload;
