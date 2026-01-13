import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BookingDialog from "@/components/BookingDialog";
import { ArrowLeft, Phone, Calendar, MapPin, DollarSign, Briefcase } from "lucide-react";
import { API_ENDPOINTS } from "@/config/api";

interface Worker {
  _id: string;
  name: string;
  phone: string;
  email: string;
  service: string;
  location: string;
  fullAddress?: string;
  pincode?: string;
  experience?: string;
  perDayCharges: number;
  description?: string;
}

const WorkersList = () => {
  const { t } = useLanguage();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const service = searchParams.get("service") || "";
  const pincodeParam = searchParams.get("pincode") || "";
  
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [pincode, setPincode] = useState(pincodeParam);
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState<Worker | null>(null);

  useEffect(() => {
    fetchWorkers();
  }, [service, pincodeParam]);

  const fetchWorkers = async () => {
    try {
      setIsLoading(true);
      setError("");
      
      let url = API_ENDPOINTS.GET_WORKERS + '?';
      const params = new URLSearchParams();
      
      if (service) {
        params.append('service', service);
      }
      
      if (pincodeParam) {
        params.append('pincode', pincodeParam);
      }
      
      url += params.toString();
      
      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch workers');
      }

      setWorkers(data.workers || []);
    } catch (err) {
      console.error('Error fetching workers:', err);
      setError(err instanceof Error ? err.message : t("workersList.fetchError") || "Failed to load workers");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePincodeSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode && /^\d{6}$/.test(pincode)) {
      navigate(`/workers?pincode=${encodeURIComponent(pincode)}${service ? `&service=${encodeURIComponent(service)}` : ''}`);
    } else {
      setError(t("workersList.invalidPincode") || "Please enter a valid 6-digit pincode");
    }
  };

  const handlePhoneClick = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  const handleBookingClick = (worker: Worker) => {
    if (!isAuthenticated) {
      // Redirect to sign up page if not logged in
      navigate("/register-user");
      return;
    }
    
    // Show booking dialog if logged in
    setSelectedWorker(worker);
    setBookingDialogOpen(true);
  };

  const handleBookingSuccess = () => {
    // Refresh workers list or show success message
    fetchWorkers();
  };

  const getServiceName = (serviceType: string) => {
    const serviceMap: Record<string, string> = {
      carpenter: "services.carpenter",
      plumber: "services.plumber",
      electrician: "services.electrician",
      painter: "services.painter",
      dailyLabour: "services.dailyLabour",
      cleaning: "services.cleaning",
      makeupArtist: "services.makeupArtist",
      locksmith: "services.locksmith",
      carMechanic: "services.carMechanic",
    };
    return t(serviceMap[serviceType] || serviceType);
  };

  return (
    <div className="min-h-screen">
      <Header />
      <div className="container py-20 pt-28">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t("workersList.back")}
        </Button>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            {service 
              ? `${t("workersList.title")} - ${getServiceName(service)}`
              : t("workersList.allWorkers")
            }
            {pincodeParam && ` (Pincode: ${pincodeParam})`}
          </h1>
          <p className="text-muted-foreground mb-6">
            {t("workersList.subtitle")}
          </p>

          {/* Pincode Search */}
          <form onSubmit={handlePincodeSearch} className="flex gap-3 max-w-md">
            <input
              type="text"
              maxLength={6}
              value={pincode}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '');
                setPincode(value);
                setError("");
              }}
              placeholder={t("workersList.searchByPincode") || "Search by pincode (6 digits)"}
              className="flex-1 px-4 py-2 border border-input rounded-md bg-background"
            />
            <Button type="submit" variant="default">
              {t("workersList.search") || "Search"}
            </Button>
          </form>
          {pincodeParam && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setPincode("");
                navigate(`/workers${service ? `?service=${encodeURIComponent(service)}` : ''}`);
              }}
              className="mt-2"
            >
              {t("workersList.clearPincode") || "Clear pincode filter"}
            </Button>
          )}
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">{t("workersList.loading")}</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-destructive">{error}</p>
            <Button onClick={fetchWorkers} className="mt-4">
              {t("workersList.retry")}
            </Button>
          </div>
        ) : workers.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg mb-4">
              {t("workersList.noWorkers")}
            </p>
            <Button onClick={() => navigate("/")} variant="outline">
              {t("workersList.backToHome")}
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workers.map((worker) => (
              <Card key={worker._id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2">{worker.name}</CardTitle>
                      <CardDescription className="flex items-center gap-2 mt-2">
                        <Briefcase className="h-4 w-4" />
                        {getServiceName(worker.service)}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <div className="flex flex-col">
                      <span>{worker.location}</span>
                      {worker.pincode && (
                        <span className="text-xs text-primary font-medium">PIN: {worker.pincode}</span>
                      )}
                    </div>
                  </div>
                  
                  {worker.experience && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{worker.experience} {t("workersList.yearsExperience")}</span>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                    <DollarSign className="h-4 w-4" />
                    <span>₹{worker.perDayCharges} {t("workersList.perDay")}</span>
                  </div>
                  
                  {worker.description && (
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {worker.description}
                    </p>
                  )}
                </CardContent>
                <CardFooter className="flex gap-3">
                  <Button
                    variant="default"
                    className="flex-1"
                    onClick={() => handleBookingClick(worker)}
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    {t("workersList.book")}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handlePhoneClick(worker.phone)}
                  >
                    <Phone className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
      <Footer />
      
      <BookingDialog
        open={bookingDialogOpen}
        onOpenChange={setBookingDialogOpen}
        worker={selectedWorker}
        onBookingSuccess={handleBookingSuccess}
      />
    </div>
  );
};

export default WorkersList;

