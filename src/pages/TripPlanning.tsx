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
    <div className="min-h-screen bg-tricolour-mesh relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-tricolour-subtle"></div>
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23059669' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
      
      {/* Enhanced Header */}
      <header className="glass-saffron backdrop-blur-xl border-b border-white/20 shadow-premium relative z-10">
        <div className="max-w-6xl mx-auto flex items-center space-x-4 p-4">
          <Button 
            variant="ghost" 
            className="text-white hover:bg-white/20 glass hover-lift font-semibold"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-white/20 backdrop-blur-sm p-1 shadow-saffron">
              <img 
                src="/lovable-uploads/e81fabc3-1be6-4500-afbd-503816b027c1.png" 
                alt="AapkaSarthy Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white-contrast text-shadow-strong">Spiritual Trip Planning</h1>
              <p className="text-xs text-orange-100 font-medium">Plan your sacred journey</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-6 relative z-10">
        {/* Enhanced Main Planning Form */}
        <Card className="mb-8 card-premium border-l-4 border-l-saffron hover-lift">
          <CardHeader>
            <CardTitle className="flex items-center space-x-3 text-saffron-dark text-2xl font-bold">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-saffron to-saffron-light flex items-center justify-center shadow-saffron">
                <Plane className="h-6 w-6 text-white" />
              </div>
              <span>Plan Your Spiritual Journey</span>
            </CardTitle>
            <CardDescription className="text-gray-700 font-medium text-lg">
              Select your sacred destination and travel dates for a transformative experience
            </CardDescription>
          </CardHeader>
          
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Destination Selection */}
              <div className="space-y-3">
                <Label htmlFor="destination" className="text-gray-800 font-semibold text-lg">Sacred Destination</Label>
                <Select value={selectedDestination} onValueChange={setSelectedDestination}>
                  <SelectTrigger className="h-12 text-base font-medium border-2 focus:border-saffron">
                    <SelectValue placeholder="Choose your spiritual destination" />
                  </SelectTrigger>
                  <SelectContent>
                    {spiritualDestinations.map((dest) => (
                      <SelectItem key={dest.id} value={dest.id} className="p-3">
                        <div className="flex items-center space-x-3">
                          <MapPin className="h-5 w-5 text-saffron" />
                          <div>
                            <div className="font-semibold text-gray-800">{dest.name}</div>
                            <div className="text-sm text-gray-600">{dest.state} - {dest.description}</div>
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Travel Dates */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label className="text-gray-800 font-semibold text-lg">Travel Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-medium h-12 text-base border-2 focus:border-saffron",
                          !travelDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-5 w-5" />
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
                        className="p-3"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-3">
                  <Label className="text-gray-800 font-semibold text-lg">Return Date (Optional)</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-medium h-12 text-base border-2 focus:border-saffron",
                          !returnDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-5 w-5" />
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
                        className="p-3"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              {/* Number of Travelers */}
              <div className="space-y-3">
                <Label htmlFor="travelers" className="text-gray-800 font-semibold text-lg">Number of Travelers</Label>
                <Select value={travelers} onValueChange={setTravelers}>
                  <SelectTrigger className="h-12 text-base font-medium border-2 focus:border-saffron">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[1,2,3,4,5,6,7,8].map(num => (
                      <SelectItem key={num} value={num.toString()} className="p-3">
                        <span className="font-medium">{num} {num === 1 ? 'Person' : 'People'}</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-saffron to-saffron-dark hover:from-saffron-dark hover:to-saffron text-white font-bold text-lg py-4 shadow-saffron hover-lift"
                disabled={loading}
              >
                {loading ? 'Planning Trip...' : 'Plan Spiritual Journey'}
                <Route className="ml-2 h-5 w-5" />
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Enhanced Popular Destinations */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Popular Spiritual Destinations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {spiritualDestinations.slice(0, 6).map(dest => (
              <Card key={dest.id} className="card-premium hover-lift cursor-pointer border-l-4 border-l-indian-green group"
                    onClick={() => setSelectedDestination(dest.id)}>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indian-green to-indian-green-light flex items-center justify-center shadow-green">
                      <MapPin className="h-4 w-4 text-white" />
                    </div>
                    <h3 className="font-bold text-indian-green text-lg group-hover:text-indian-green-dark">{dest.name}</h3>
                  </div>
                  <p className="text-gray-700 mb-3 font-medium">{dest.description}</p>
                  <Badge variant="outline" className="font-semibold border-indian-green text-indian-green">
                    {dest.state}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Enhanced Trip Planning Features */}
        <Card className="card-premium border-l-4 border-l-blue-500 hover-lift">
          <CardHeader>
            <CardTitle className="text-blue-700 text-2xl font-bold">What's Included in Trip Planning</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-bold text-gray-800 text-lg flex items-center">
                  <span className="text-2xl mr-2">✨</span>
                  Spiritual Guidance
                </h4>
                <p className="text-gray-700 font-medium">Curated temple visits and ritual timings</p>
              </div>
              <div className="space-y-3">
                <h4 className="font-bold text-gray-800 text-lg flex items-center">
                  <span className="text-2xl mr-2">🏨</span>
                  Accommodation
                </h4>
                <p className="text-gray-700 font-medium">Sacred guest houses and dharamshalas</p>
              </div>
              <div className="space-y-3">
                <h4 className="font-bold text-gray-800 text-lg flex items-center">
                  <span className="text-2xl mr-2">🚗</span>
                  Transportation
                </h4>
                <p className="text-gray-700 font-medium">Local travel and pilgrimage routes</p>
              </div>
              <div className="space-y-3">
                <h4 className="font-bold text-gray-800 text-lg flex items-center">
                  <span className="text-2xl mr-2">📿</span>
                  Ritual Support
                </h4>
                <p className="text-gray-700 font-medium">Priest booking and ceremony arrangements</p>
              </div>
            </div>
            <div className="mt-6 p-4 bg-gradient-to-r from-orange-50 to-green-50 rounded-lg border border-orange-200">
              <p className="text-orange-800 font-medium">
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
