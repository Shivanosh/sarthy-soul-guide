
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Calendar, Clock, Users, Phone, Mail, CheckCircle, XCircle, Eye } from 'lucide-react';
import { toast } from 'sonner';

const RitualManagement = () => {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState('all');

  const [bookingRequests, setBookingRequests] = useState([
    {
      id: 1,
      customerName: 'Rajesh Kumar',
      email: 'rajesh@example.com',
      phone: '+91 98765 43210',
      ritual: 'Ganesha Pooja',
      date: '2024-06-25',
      time: 'Morning (7:00-10:00 AM)',
      participants: '1-5 people',
      address: '123 Temple Street, Delhi',
      status: 'pending',
      requestDate: '2024-06-21',
      specialRequests: 'Need priest who speaks Hindi'
    },
    {
      id: 2,
      customerName: 'Priya Sharma',
      email: 'priya@example.com',
      phone: '+91 87654 32109',
      ritual: 'Lakshmi Pooja',
      date: '2024-06-28',
      time: 'Evening (5:00-8:00 PM)',
      participants: '6-15 people',
      address: '456 Garden Colony, Mumbai',
      status: 'approved',
      requestDate: '2024-06-20',
      specialRequests: 'Family gathering, need extra prasadam'
    },
    {
      id: 3,
      customerName: 'Amit Patel',
      email: 'amit@example.com',
      phone: '+91 76543 21098',
      ritual: 'Navgraha Pooja',
      date: '2024-06-30',
      time: 'Early Morning (5:00-7:00 AM)',
      participants: '1-5 people',
      address: '789 Ashram Road, Bangalore',
      status: 'rejected',
      requestDate: '2024-06-19',
      specialRequests: 'Astrological consultation required'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="h-4 w-4" />;
      case 'rejected': return <XCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const handleStatusChange = (bookingId: number, newStatus: string) => {
    setBookingRequests(prev =>
      prev.map(booking =>
        booking.id === bookingId
          ? { ...booking, status: newStatus }
          : booking
      )
    );

    const statusMessages = {
      approved: 'Booking approved successfully!',
      rejected: 'Booking has been rejected.',
      pending: 'Booking moved back to pending.'
    };

    toast.success(statusMessages[newStatus as keyof typeof statusMessages]);
  };

  const filteredBookings = bookingRequests.filter(booking =>
    statusFilter === 'all' || booking.status === statusFilter
  );

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
            <Calendar className="h-6 w-6" />
            <h1 className="text-xl font-bold">Ritual Management</h1>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-yellow-600">12</div>
              <div className="text-sm text-gray-600">Pending Requests</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-green-600">28</div>
              <div className="text-sm text-gray-600">Approved This Month</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-blue-600">156</div>
              <div className="text-sm text-gray-600">Total Bookings</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-purple-600">₹2.1L</div>
              <div className="text-sm text-gray-600">Revenue This Month</div>
            </CardContent>
          </Card>
        </div>

        {/* Filter Section */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-800">Booking Requests</h2>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Requests</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Booking Requests */}
        <div className="space-y-4">
          {filteredBookings.map((booking) => (
            <Card key={booking.id} className="hover:shadow-lg transition-all duration-300">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">#{booking.id} - {booking.customerName}</CardTitle>
                    <CardDescription className="flex items-center space-x-4 mt-1">
                      <span className="flex items-center">
                        <Mail className="h-4 w-4 mr-1" />
                        {booking.email}
                      </span>
                      <span className="flex items-center">
                        <Phone className="h-4 w-4 mr-1" />
                        {booking.phone}
                      </span>
                    </CardDescription>
                  </div>
                  <Badge className={getStatusColor(booking.status)}>
                    <span className="flex items-center space-x-1">
                      {getStatusIcon(booking.status)}
                      <span className="capitalize">{booking.status}</span>
                    </span>
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                  <div>
                    <h4 className="font-semibold text-orange-800 mb-2">Ritual Details</h4>
                    <div className="space-y-1 text-sm">
                      <div><span className="font-medium">Ritual:</span> {booking.ritual}</div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {booking.date}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {booking.time}
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {booking.participants}
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-orange-800 mb-2">Address</h4>
                    <p className="text-sm text-gray-600">{booking.address}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-orange-800 mb-2">Special Requests</h4>
                    <p className="text-sm text-gray-600">
                      {booking.specialRequests || 'No special requests'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="text-sm text-gray-500">
                    Requested on: {booking.requestDate}
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-3 w-3 mr-1" />
                      View Details
                    </Button>
                    
                    {booking.status === 'pending' && (
                      <>
                        <Button 
                          size="sm" 
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() => handleStatusChange(booking.id, 'approved')}
                        >
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Approve
                        </Button>
                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={() => handleStatusChange(booking.id, 'rejected')}
                        >
                          <XCircle className="h-3 w-3 mr-1" />
                          Reject
                        </Button>
                      </>
                    )}
                    
                    {booking.status !== 'pending' && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleStatusChange(booking.id, 'pending')}
                      >
                        Reset to Pending
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredBookings.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No bookings found</h3>
            <p className="text-gray-500">No bookings match the selected filter</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RitualManagement;
