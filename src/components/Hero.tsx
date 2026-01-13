import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MapPin, Search } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import VantaBackground from "@/components/VantaBackground";

const Hero = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [pincode, setPincode] = useState("");
  const [locationQuery, setLocationQuery] = useState("");
  const [locationSuggestions, setLocationSuggestions] = useState<
    Array<{
      displayName: string;
      address: { postcode?: string };
    }>
  >([]);
  const [isSearchingLocation, setIsSearchingLocation] = useState(false);
  const [error, setError] = useState("");

  const handleFindWorkers = () => {
    const sanitized = pincode.replace(/\D/g, "");
    if (sanitized.length !== 6) {
      setError(t("workersList.invalidPincode") || "Please enter a valid 6-digit pincode");
      return;
    }
    setError("");
    navigate(`/workers?pincode=${encodeURIComponent(sanitized)}`);
  };

  useEffect(() => {
    const controller = new AbortController();

    const fetchSuggestions = async () => {
      if (!locationQuery || locationQuery.length < 3) {
        setLocationSuggestions([]);
        setIsSearchingLocation(false);
        return;
      }
      try {
        setIsSearchingLocation(true);
        const url = `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&limit=5&q=${encodeURIComponent(
          locationQuery,
        )}`;
        const res = await fetch(url, {
          signal: controller.signal,
          headers: { "Accept-Language": "en" },
        });
        if (!res.ok) throw new Error("Failed to fetch suggestions");
        const data = await res.json();
        const mapped = data.map((item: any) => ({
          displayName: item.display_name as string,
          address: item.address || {},
        }));
        setLocationSuggestions(mapped);
      } catch (err) {
        if (controller.signal.aborted) return;
        console.error("Location suggest error:", err);
      } finally {
        setIsSearchingLocation(false);
      }
    };

    const debounce = setTimeout(fetchSuggestions, 300);
    return () => {
      clearTimeout(debounce);
      controller.abort();
    };
  }, [locationQuery]);

  const handleSelectLocation = (suggestion: { displayName: string; address: { postcode?: string } }) => {
    setLocationQuery(suggestion.displayName);
    const pin = suggestion.address.postcode || "";
    if (pin) {
      setPincode(pin);
      setError("");
    } else {
      setError(t("workersList.invalidPincode") || "Please select an address that includes a pincode");
    }
    setLocationSuggestions([]);
  };

  return (
    <section className="relative pt-24 md:pt-32 pb-16 md:pb-24 overflow-hidden">
      <VantaBackground color={0x60606} waveSpeed={1.0} zoom={1.0} />
      
      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left side - Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6 animate-fade-in ${language === 'hi' ? 'font-hindi' : ''}`}>
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              {t("hero.badge")}
            </div>

            {/* Headline */}
            <h1 className={`font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6 animate-fade-in-up text-balance ${language === 'hi' ? 'font-hindi' : ''}`}>
              {t("hero.title")}{" "}
              <span className="text-primary">{t("hero.titleHighlight")}</span>{" "}
              {t("hero.titleEnd")}
            </h1>

            {/* Subheadline */}
            <p className={`text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl lg:max-w-none animate-fade-in-up text-balance ${language === 'hi' ? 'font-hindi' : ''}`} style={{ animationDelay: "0.1s" }}>
              {t("hero.subtitle")}
            </p>

            {/* Search Box */}
            <div className="bg-card rounded-2xl shadow-elevated p-2 md:p-3 max-w-xl lg:max-w-none animate-scale-in" style={{ animationDelay: "0.2s" }}>
              <div className="flex flex-col gap-3">
                <div className="flex flex-col md:flex-row gap-2">
                  <div className="flex-1 flex items-center gap-3 px-4 py-3 rounded-xl bg-background border border-input">
                    <MapPin className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                    <input
                      type="text"
                      value={locationQuery}
                      onChange={(e) => {
                        setLocationQuery(e.target.value);
                        setError("");
                      }}
                      placeholder={t("hero.locationPlaceholder")}
                      className={`flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground ${language === 'hi' ? 'font-hindi' : ''}`}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          if (pincode) {
                            handleFindWorkers();
                          }
                        }
                      }}
                    />
                  </div>
                  <Button
                    variant="hero"
                    size="xl"
                    className={`w-full md:w-auto ${language === 'hi' ? 'font-hindi' : ''}`}
                    onClick={handleFindWorkers}
                  >
                    <Search className="w-5 h-5" />
                    {t("hero.findWorkers")}
                  </Button>
                </div>
                {isSearchingLocation && (
                  <p className="text-xs text-muted-foreground text-left px-1">
                    {t("hero.searching") || "Searching..."}
                  </p>
                )}
                {locationSuggestions.length > 0 && (
                  <div className="rounded-lg border bg-card shadow-sm divide-y">
                    {locationSuggestions.map((s, idx) => (
                      <button
                        key={`${s.displayName}-${idx}`}
                        type="button"
                        className="w-full text-left px-3 py-2 hover:bg-muted transition-colors"
                        onClick={() => handleSelectLocation(s)}
                      >
                        <p className={`text-sm text-foreground ${language === 'hi' ? 'font-hindi' : ''}`}>{s.displayName}</p>
                        {s.address.postcode && (
                          <p className={`text-xs text-muted-foreground ${language === 'hi' ? 'font-hindi' : ''}`}>PIN: {s.address.postcode}</p>
                        )}
                      </button>
                    ))}
                  </div>
                )}
                {error && (
                  <p className="text-xs text-destructive text-left px-1">
                    {error}
                  </p>
                )}
              </div>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 md:gap-8 mt-10 text-sm text-muted-foreground animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className={language === 'hi' ? 'font-hindi' : ''}>{t("hero.verified")}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className={language === 'hi' ? 'font-hindi' : ''}>{t("hero.fairPricing")}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className={language === 'hi' ? 'font-hindi' : ''}>{t("hero.quickResponse")}</span>
              </div>
            </div>
          </div>

          {/* Right side - Lottie Animation */}
          <div className="hidden lg:flex items-center justify-center animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <div className="w-full max-w-5xl">
              <DotLottieReact
                src="https://lottie.host/14063f5d-59c2-4ab4-91c9-8bf1472cf3c5/64los2PVat.lottie"
                loop
                autoplay
                className="
                w-[400px] h-[400px]
                md:w-[420px] md:h-[420px]
                xl:w-[560px] xl:h-[560px]
              "
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;