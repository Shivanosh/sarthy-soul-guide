import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import LoginUser from "./pages/LoginUser";
import LoginAdmin from "./pages/LoginAdmin";
import Register from "./pages/Register";
import MoodSelection from "./pages/MoodSelection";
import MediaLibrary from "./pages/MediaLibrary";
import RitualBooking from "./pages/RitualBooking";
import MediaUpload from "./pages/admin/MediaUpload";
import RitualManagement from "./pages/admin/RitualManagement";
import TripPlanning from "./pages/TripPlanning";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login-user" element={<LoginUser />} />
          <Route path="/login-admin" element={<LoginAdmin />} />
          <Route path="/register" element={<Register />} />
          <Route path="/mood-selection" element={<MoodSelection />} />
          <Route path="/media-library" element={<MediaLibrary />} />
          <Route path="/ritual-booking" element={<RitualBooking />} />
          <Route path="/trip-planning" element={<TripPlanning />} />
          <Route path="/admin/media-upload" element={<MediaUpload />} />
          <Route path="/admin/ritual-management" element={<RitualManagement />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
