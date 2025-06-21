
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Calendar, Clock, Users, MapPin, Star, Phone, Mail } from 'lucide-react';
import { toast } from 'sonner';

const RitualBooking = () => {
  const navigate = useNavigate();
  const [selectedRitual, setSelectedRitual] = useState('');
  const [bookingForm, setBookingForm] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    participants: '',
    address: '',
    specialRequests: ''
  });

  const rituals = [
    {
      id: 'ganesha-pooja',
      name: 'Ganesha Pooja',
      description: 'Remove obstacles and bring good fortune',
      duration: '1-2 hours',
      price: '₹2,100',
      includes: ['Priest services', 'All materials', 'Prasadam'],
      bestFor: 'New beginnings, business ventures'
    },
    {
      id: 'lakshmi-pooja',
      name: 'Lakshmi Pooja',
      description: 'Attract wealth and prosperity',
      duration: '2-3 hours',
      price: '₹3,500',
      includes: ['Priest services', 'Gold kalash', 'All materials', 'Prasadam'],
      bestFor: 'Financial growth, abundance'
    },
    {
      id: 'navgraha-pooja',
      name: 'Navgraha Pooja',
      description: 'Balance planetary influences',
      duration: '3-4 hours',
      price: '₹5,100',
      includes: ['Expert astrologer-priest', 'All materials', 'Gemstone blessing'],
      bestFor: 'Astrological remedies, life balance'
    },
    {
      id: 'satyanarayan-pooja',
      name: 'Satyanarayan Pooja',
      description: 'Express gratitude and seek blessings',
      duration: '2-3 hours',
      price: '₹2,800',
      includes: ['Priest services', 'Story recitation', 'All materials', 'Prasadam'],
      bestFor: 'Thanksgiving, family harmony'
    },
    {
      id: 'rudrabhishek',
      name: 'Rudrabhishek',
      description: 'Powerful Shiva worship for purification',
      duration: '1.5-2 hours',
      price: '₹4,200',
      includes: ['Vedic priest', 'Sacred materials', 'Abhishek items'],
      bestFor: 'Spiritual purification, health'
    },
    {
      id: 'havan-ceremony',
      name: 'Havan Ceremony',
      description: 'Fire ritual for purification and blessings',
      duration: '2-3 hours',
      price: '₹3,800',
      includes: ['Fire altar setup', 'Priest services', 'All materials'],
      bestFor: 'Home purification, special occasions'
    }
  ];

  const handleFormChange = (field: string, value: string) => {
    setBookingForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedRitual) {
      toast.error('Please select a ritual first');
      return;
    }

    // Mock booking submission
    toast.success('Booking request submitted! We will contact you within 24 hours.');
    
    // Reset form
    setBookingForm({
      name: '',
      email: '',
      phone: '',
      date: '',
      time: '',
      participants: '',
      address: '',
      specialRequests: ''
    });
  };

  const selectedRitualDetails = rituals.find(r => r.id === selectedRitual);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-orange-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-orange-500 text-white p-4">
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
            <Calendar className="h-6 w-6" />
            <h1 className="text-xl font-bold">Book Sacred Rituals</h1>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Ritual Selection */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Choose Your Ritual</h2>
            <div className="space-y-4">
              {rituals.map((ritual) => (
                <Card 
                  key={ritual.id}
                  className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                    selectedRitual === ritual.id ? 'ring-2 ring-purple-500 border-purple-200' : ''
                  }`}
                  onClick={() => setSelectedRitual(ritual.id)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{ritual.name}</CardTitle>
                      <Badge className="bg-purple-100 text-purple-800">{ritual.price}</Badge>
                    </div>
                    <CardDescription>{ritual.description}</CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center text-gray-600">
                        <Clock className="h-4 w-4 mr-2" />
                        Duration: {ritual.duration}
                      </div>
                      <div className="text-gray-600">
                        <span className="font-medium">Includes:</span> {ritual.includes.join(', ')}
                      </div>
                      <div className="text-green-700">
                        <span className="font-medium">Best for:</span> {ritual.bestFor}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Booking Form */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Booking Details</h2>
            
            {selectedRitualDetails && (
              <Card className="mb-6 border-purple-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-purple-800">
                    Selected: {selectedRitualDetails.name}
                  </CardTitle>
                  <CardDescription>
                    {selectedRitualDetails.description} - {selectedRitualDetails.price}
                  </CardDescription>
                </CardHeader>
              </Card>
            )}

            <Card>
              <CardContent className="p-6">
                <form onSubmit={handleBooking} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={bookingForm.name}
                        onChange={(e) => handleFormChange('name', e.target.value)}
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={bookingForm.email}
                        onChange={(e) => handleFormChange('email', e.target.value)}
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      value={bookingForm.phone}
                      onChange={(e) => handleFormChange('phone', e.target.value)}
                      placeholder="+91 XXXXX XXXXX"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="date">Preferred Date *</Label>
                      <Input
                        id="date"
                        type="date"
                        value={bookingForm.date}
                        onChange={(e) => handleFormChange('date', e.target.value)}
                        required
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="time">Preferred Time *</Label>
                      <Select value={bookingForm.time} onValueChange={(value) => handleFormChange('time', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="early-morning">Early Morning (5:00-7:00 AM)</SelectItem>
                          <SelectItem value="morning">Morning (7:00-10:00 AM)</SelectItem>
                          <SelectItem value="afternoon">Afternoon (2:00-5:00 PM)</SelectItem>
                          <SelectItem value="evening">Evening (5:00-8:00 PM)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="participants">Number of Participants</Label>
                    <Select value={bookingForm.participants} onValueChange={(value) => handleFormChange('participants', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select participants" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-5">1-5 people</SelectItem>
                        <SelectItem value="6-15">6-15 people</SelectItem>
                        <SelectItem value="16-30">16-30 people</SelectItem>
                        <SelectItem value="30+">30+ people</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="address">Address *</Label>
                    <Textarea
                      id="address"
                      value={bookingForm.address}
                      onChange={(e) => handleFormChange('address', e.target.value)}
                      placeholder="Full address where the ritual will be performed"
                      required
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="specialRequests">Special Requests</Label>
                    <Textarea
                      id="specialRequests"
                      value={bookingForm.specialRequests}
                      onChange={(e) => handleFormChange('specialRequests', e.target.value)}
                      placeholder="Any specific requirements or preferences"
                      rows={3}
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-purple-500 to-orange-500 hover:from-purple-600 hover:to-orange-600"
                    disabled={!selectedRitual}
                  >
                    {selectedRitual ? 'Submit Booking Request' : 'Please Select a Ritual First'}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card className="mt-6 bg-gradient-to-r from-purple-50 to-orange-50 border-purple-200">
              <CardContent className="p-4">
                <h3 className="font-semibold text-purple-800 mb-3">Need Help?</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center text-gray-600">
                    <Phone className="h-4 w-4 mr-2" />
                    +91 98765 43210
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Mail className="h-4 w-4 mr-2" />
                    rituals@aapkasarthy.com
                  </div>
                  <p className="text-gray-500 mt-2">
                    Our team will contact you within 24 hours to confirm details and arrange the ceremony.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RitualBooking;
