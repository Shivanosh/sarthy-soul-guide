
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Register from "./pages/Register";
import LoginUser from "./pages/LoginUser";
import LoginAdmin from "./pages/LoginAdmin";
import MoodSelection from "./pages/MoodSelection";
import MediaLibrary from "./pages/MediaLibrary";
import RitualBooking from "./pages/RitualBooking";
import TripPlanning from "./pages/TripPlanning";
import MediaUpload from "./pages/admin/MediaUpload";
import RitualManagement from "./pages/admin/RitualManagement";
import UserManagement from "./pages/admin/UserManagement";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login-user" element={<LoginUser />} />
          <Route path="/login-admin" element={<LoginAdmin />} />
          <Route path="/mood-selection" element={<MoodSelection />} />
          <Route path="/media-library" element={<MediaLibrary />} />
          <Route path="/ritual-booking" element={<RitualBooking />} />
          <Route path="/trip-planning" element={<TripPlanning />} />
          <Route path="/admin/media-upload" element={<MediaUpload />} />
          <Route path="/admin/ritual-management" element={<RitualManagement />} />
          <Route path="/admin/user-management" element={<UserManagement />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
