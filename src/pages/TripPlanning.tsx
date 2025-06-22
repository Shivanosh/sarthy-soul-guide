
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, CalendarIcon, MapPin, Plane, Route } from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

const TripPlanning = () => {
  const navigate = useNavigate();
  const [selectedDestination, setSelectedDestination] = useState('');
  const [travelDate, setTravelDate] = useState<Date>();
  const [returnDate, setReturnDate] = useState<Date>();
  const [travelers, setTravelers] = useState('1');
  const [loading, setLoading] = useState(false);

  const spiritualDestinations = [
    { id: 'varanasi', name: 'Varanasi', state: 'Uttar Pradesh', description: 'Holy city on the Ganges' },
    { id: 'rishikesh', name: 'Rishikesh', state: 'Uttarakhand', description: 'Yoga capital of the world' },
    { id: 'haridwar', name: 'Haridwar', state: 'Uttarakhand', description: 'Gateway to the gods' },
    { id: 'vrindavan', name: 'Vrindavan', state: 'Uttar Pradesh', description: 'Krishna\'s divine playground' },
    { id: 'tirupati', name: 'Tirupati', state: 'Andhra Pradesh', description: 'Abode of Lord Venkateswara' },
    { id: 'kedarnath', name: 'Kedarnath', state: 'Uttarakhand', description: 'Sacred Shiva temple' },
    { id: 'badrinath', name: 'Badrinath', state: 'Uttarakhand', description: 'Vishnu\'s holy shrine' },
    { id: 'amritsar', name: 'Amritsar', state: 'Punjab', description: 'Golden Temple city' },
    { id: 'shirdi', name: 'Shirdi', state: 'Maharashtra', description: 'Sai Baba\'s sacred land' },
    { id: 'kashi-vishwanath', name: 'Kashi Vishwanath', state: 'Uttar Pradesh', description: 'Lord Shiva\'s temple' },
    { id: 'mathura', name: 'Mathura', state: 'Uttar Pradesh', description: 'Krishna\'s birthplace' },
    { id: 'pushkar', name: 'Pushkar', state: 'Rajasthan', description: 'Sacred lake and Brahma temple' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedDestination || !travelDate) {
      toast.error('Please select destination and travel date');
      return;
    }

    setLoading(true);

    try {
      const selectedDest = spiritualDestinations.find(d => d.id === selectedDestination);
      
      // Mock trip planning data - will be sent to backend later
      const tripData = {
        destination: selectedDest,
        travelDate: travelDate,
        returnDate: returnDate,
        travelers: parseInt(travelers),
        timestamp: new Date().toISOString()
      };

      // Store in localStorage for now (will be replaced with backend)
      const existingTrips = JSON.parse(localStorage.getItem('plannedTrips') || '[]');
      existingTrips.push(tripData);
      localStorage.setItem('plannedTrips', JSON.stringify(existingTrips));

      toast.success(`Trip to ${selectedDest?.name} planned successfully! 🙏`);
      
      // Reset form
      setSelectedDestination('');
      setTravelDate(undefined);
      setReturnDate(undefined);
      setTravelers('1');
      
    } catch (error) {
      toast.error('Failed to plan trip. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-tricolour text-white p-4 shadow-lg relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-saffron-dark/90 via-white/10 to-indian-green/90"></div>
        <div className="relative max-w-6xl mx-auto flex items-center space-x-4">
          <Button 
            variant="ghost" 
            className="text-white hover:bg-white/20"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-white p-1">
              <img 
                src="/lovable-uploads/e81fabc3-1be6-4500-afbd-503816b027c1.png" 
                alt="AapkaSarthy Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white-contrast">Spiritual Trip Planning</h1>
              <p className="text-xs text-orange-100">Plan your sacred journey</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-6">
        {/* Main Planning Form */}
        <Card className="mb-8 shadow-xl border-l-4 border-l-saffron">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-saffron-dark">
              <Plane className="h-6 w-6" />
              <span>Plan Your Spiritual Journey</span>
            </CardTitle>
            <CardDescription>
              Select your sacred destination and travel dates for a transformative experience
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Destination Selection */}
              <div className="space-y-2">
                <Label htmlFor="destination">Sacred Destination</Label>
                <Select value={selectedDestination} onValueChange={setSelectedDestination}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose your spiritual destination" />
                  </SelectTrigger>
                  <SelectContent>
                    {spiritualDestinations.map((dest) => (
                      <SelectItem key={dest.id} value={dest.id}>
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4 text-saffron" />
                          <div>
                            <div className="font-medium">{dest.name}</div>
                            <div className="text-sm text-gray-500">{dest.state} - {dest.description}</div>
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Travel Dates */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Travel Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !travelDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {travelDate ? format(travelDate, "PPP") : "Select travel date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={travelDate}
                        onSelect={setTravelDate}
                        disabled={(date) => date < new Date()}
                        initialFocus
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label>Return Date (Optional)</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !returnDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {returnDate ? format(returnDate, "PPP") : "Select return date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={returnDate}
                        onSelect={setReturnDate}
                        disabled={(date) => date < (travelDate || new Date())}
                        initialFocus
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              {/* Number of Travelers */}
              <div className="space-y-2">
                <Label htmlFor="travelers">Number of Travelers</Label>
                <Select value={travelers} onValueChange={setTravelers}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[1,2,3,4,5,6,7,8].map(num => (
                      <SelectItem key={num} value={num.toString()}>
                        {num} {num === 1 ? 'Person' : 'People'}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-saffron to-saffron-dark hover:from-saffron-dark hover:to-saffron text-white font-medium"
                disabled={loading}
              >
                {loading ? 'Planning Trip...' : 'Plan Spiritual Journey'}
                <Route className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Popular Destinations */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Popular Spiritual Destinations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {spiritualDestinations.slice(0, 6).map(dest => (
              <Card key={dest.id} className="hover:shadow-md transition-all cursor-pointer border-l-4 border-l-indian-green"
                    onClick={() => setSelectedDestination(dest.id)}>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <MapPin className="h-4 w-4 text-indian-green" />
                    <h3 className="font-semibold text-indian-green">{dest.name}</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{dest.description}</p>
                  <Badge variant="outline" className="text-xs">
                    {dest.state}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Trip Planning Features */}
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader>
            <CardTitle className="text-blue-700">What's Included in Trip Planning</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-medium text-gray-800">✨ Spiritual Guidance</h4>
                <p className="text-sm text-gray-600">Curated temple visits and ritual timings</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-gray-800">🏨 Accommodation</h4>
                <p className="text-sm text-gray-600">Sacred guest houses and dharamshalas</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-gray-800">🚗 Transportation</h4>
                <p className="text-sm text-gray-600">Local travel and pilgrimage routes</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-gray-800">📿 Ritual Support</h4>
                <p className="text-sm text-gray-600">Priest booking and ceremony arrangements</p>
              </div>
            </div>
            <div className="mt-4 p-3 bg-orange-50 rounded-lg">
              <p className="text-sm text-orange-800">
                <strong>Note:</strong> Trip planning feature will be enhanced with backend integration for booking confirmations and detailed itineraries.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TripPlanning;
