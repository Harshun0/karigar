import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { format } from "date-fns";
import { Calendar, Clock, IndianRupee, User, Wrench, CreditCard, Wallet } from "lucide-react";
import { API_ENDPOINTS } from "@/config/api";

interface Booking {
  _id: string;
  workerName: string;
  service: string;
  startDate: string;
  endDate: string;
  time: string;
  totalPrice?: number;
  status?: string;
  perDayCharges?: number;
  dayCount?: number;
}

const Profile = () => {
  const { user, isAuthenticated } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated || !user) {
      navigate("/login");
      return;
    }

    const fetchBookings = async () => {
      try {
        setIsLoading(true);
        setError("");
        
        const userId = user.id;
        if (!userId) {
          setError("User ID not found. Please login again.");
          setIsLoading(false);
          return;
        }

        console.log('Fetching bookings for userId:', userId);
        const res = await fetch(`${API_ENDPOINTS.GET_BOOKINGS}?userId=${encodeURIComponent(userId)}`);
        
        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}));
          console.error('Error response:', errorData);
          throw new Error(errorData.message || `HTTP error! status: ${res.status}`);
        }
        
        const data = await res.json();
        console.log('Bookings API response:', data);
        
        if (data.success && data.bookings) {
          console.log('Setting bookings:', data.bookings);
          setBookings(data.bookings);
        } else if (Array.isArray(data)) {
          // Handle case where backend returns array directly
          console.log('Setting bookings from array:', data);
          setBookings(data);
        } else if (data.bookings && Array.isArray(data.bookings)) {
          // Another fallback
          console.log('Setting bookings from data.bookings:', data.bookings);
          setBookings(data.bookings);
        } else {
          console.log('No bookings found, setting empty array');
          setBookings([]);
        }
      } catch (err) {
        console.error('Error fetching bookings:', err);
        setError(err instanceof Error ? err.message : "Failed to load bookings. Please check if the server is running.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, [isAuthenticated, user, navigate]);

  const handlePayNow = (booking: Booking) => {
    // Placeholder for payment flow
    alert(`${t("profile.payNowAlert") || "Pay"} ₹${booking.totalPrice || 0} ${t("profile.for") || "for"} ${booking.workerName}`);
  };

  const handlePayToPerson = (booking: Booking) => {
    alert(`${t("profile.payToPersonAlert") || "Please pay"} ₹${booking.totalPrice || 0} ${t("profile.directlyTo") || "directly to"} ${booking.workerName}`);
  };

  // Show loading state while checking authentication
  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-20 pt-28 max-w-6xl">
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Redirecting to login...</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container py-20 pt-28 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">{t("profile.title") || "Your Profile"}</h1>
          <div className="flex items-center gap-2 text-muted-foreground">
            <User className="h-4 w-4" />
            <span>{user.name}</span>
            <span>•</span>
            <span>{user.email}</span>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">{t("profile.myBookings") || "My Bookings"}</h2>
        </div>

        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">{t("profile.loading") || "Loading bookings..."}</p>
            </div>
          </div>
        )}

        {error && (
          <div className="rounded-lg bg-destructive/10 border border-destructive/20 p-4 mb-6">
            <p className="text-destructive text-sm">{error}</p>
            <Button
              variant="outline"
              size="sm"
              className="mt-2"
              onClick={() => window.location.reload()}
            >
              {t("profile.retry") || "Retry"}
            </Button>
          </div>
        )}

        {!isLoading && !error && bookings.length === 0 && (
          <Card className="p-12 text-center">
            <div className="flex flex-col items-center gap-4">
              <Calendar className="h-12 w-12 text-muted-foreground" />
              <div>
                <h3 className="text-lg font-semibold mb-2">{t("profile.noBookings") || "No bookings yet"}</h3>
                <p className="text-muted-foreground text-sm">
                  {t("profile.noBookingsDescription") || "You haven't made any bookings yet. Start booking workers now!"}
                </p>
              </div>
              <Button onClick={() => navigate("/")}>
                {t("profile.browseWorkers") || "Browse Workers"}
              </Button>
            </div>
          </Card>
        )}

        {!isLoading && !error && bookings.length > 0 && (
          <div className="grid gap-6">
            {bookings.map((booking) => (
              <Card key={booking._id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2">{booking.workerName}</CardTitle>
                      <CardDescription className="flex flex-wrap items-center gap-3 text-sm">
                        <div className="flex items-center gap-1">
                          <Wrench className="h-4 w-4" />
                          <span className="font-medium capitalize">{booking.service}</span>
                        </div>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>
                            {format(new Date(booking.startDate), "MMM dd, yyyy")} – {format(new Date(booking.endDate), "MMM dd, yyyy")}
                          </span>
                        </div>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{booking.time}</span>
                        </div>
                      </CardDescription>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                      booking.status === "confirmed" 
                        ? "bg-emerald-100 text-emerald-700" 
                        : booking.status === "cancelled"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}>
                      {booking.status || "pending"}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">{t("profile.perDay") || "Per Day"}</span>
                        <span className="font-semibold">₹{booking.perDayCharges || 0}</span>
                      </div>
                      {booking.dayCount && (
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">{t("profile.days") || "Days"}</span>
                          <span className="font-semibold">{booking.dayCount}</span>
                        </div>
                      )}
                      <div className="flex items-center justify-between text-base pt-2 border-t">
                        <span className="font-semibold">{t("profile.total") || "Total Amount"}</span>
                        <span className="text-xl font-bold text-primary flex items-center gap-1">
                          <IndianRupee className="h-5 w-5" />
                          {booking.totalPrice || 0}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 md:justify-end">
                      <Button 
                        variant="default" 
                        onClick={() => handlePayNow(booking)}
                        className="w-full"
                      >
                        <CreditCard className="h-4 w-4 mr-2" />
                        {t("profile.payNow") || "Pay Now"}
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => handlePayToPerson(booking)}
                        className="w-full"
                      >
                        <Wallet className="h-4 w-4 mr-2" />
                        {t("profile.payToPerson") || "Pay to Person"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
