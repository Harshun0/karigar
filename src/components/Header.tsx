import { Button } from "@/components/ui/button";
import { Menu, X, Languages, User, LogOut, Calendar } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t, language, toggleLanguage } = useLanguage();
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { scrollToSection } = useSmoothScroll();

  const handleLogout = () => {
    logout();
    navigate("/");
    window.scrollTo(0, 0);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
      <div className="container">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <button 
            onClick={() => { navigate("/"); window.scrollTo(0, 0); }}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <img src="/karigar.png" alt="Karigar Logo" className="h-16 md:h-18 w-auto" />
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => scrollToSection("services")}
              className="text-muted-foreground hover:text-foreground transition-colors font-medium"
            >
              {t("nav.services")}
            </button>
            <button 
              onClick={() => scrollToSection("how-it-works")}
              className="text-muted-foreground hover:text-foreground transition-colors font-medium"
            >
              {t("nav.howItWorks")}
            </button>
            <button 
              onClick={() => scrollToSection("for-workers")}
              className="text-muted-foreground hover:text-foreground transition-colors font-medium"
            >
              {t("nav.forWorkers")}
            </button>
            <button 
              onClick={() => { navigate("/privacy-policy"); window.scrollTo(0, 0); }}
              className="text-muted-foreground hover:text-foreground transition-colors font-medium"
            >
              {t("nav.privacyPolicy")}
            </button>
            <button 
              onClick={() => { navigate("/terms-of-service"); window.scrollTo(0, 0); }}
              className="text-muted-foreground hover:text-foreground transition-colors font-medium"
            >
              {t("nav.termsOfService")}
            </button>
            <button 
              onClick={() => { navigate("/refund-policy"); window.scrollTo(0, 0); }}
              className="text-muted-foreground hover:text-foreground transition-colors font-medium"
            >
              {t("nav.refundPolicy")}
            </button>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              variant="outline"
              onClick={toggleLanguage}
              className="gap-2"
              aria-label="Toggle language"
              title={language === "en" ? "हिंदी में बदलें" : "Change to English"}
            >
              <Languages className="w-4 h-4" />
              <span className="text-sm font-medium">{language === "en" ? "EN" : "HI"}</span>
            </Button>
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <User className="w-4 h-4" />
                    <span className="text-sm font-medium">{user?.name || "Profile"}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>{user?.email}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => { navigate("/profile"); window.scrollTo(0, 0); }} className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    {t("header.profile") || "Profile"}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    {t("header.logout") || "Logout"}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button variant="ghost" onClick={() => { navigate("/login"); window.scrollTo(0, 0); }}>{t("header.login")}</Button>
                <Button onClick={() => { navigate("/register-user"); window.scrollTo(0, 0); }}>{t("header.getStarted")}</Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 -mr-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-6 animate-fade-in">
            <nav className="flex flex-col gap-4 mb-6">
              <button
                onClick={() => { scrollToSection("services"); setIsMenuOpen(false); }}
                className="text-muted-foreground hover:text-foreground transition-colors font-medium py-2 text-left"
              >
                {t("nav.services")}
              </button>
              <button
                onClick={() => { scrollToSection("how-it-works"); setIsMenuOpen(false); }}
                className="text-muted-foreground hover:text-foreground transition-colors font-medium py-2 text-left"
              >
                {t("nav.howItWorks")}
              </button>
              <button
                onClick={() => { scrollToSection("for-workers"); setIsMenuOpen(false); }}
                className="text-muted-foreground hover:text-foreground transition-colors font-medium py-2 text-left"
              >
                {t("nav.forWorkers")}
              </button>
              <button
                onClick={() => { setIsMenuOpen(false); navigate("/privacy-policy"); window.scrollTo(0, 0); }}
                className="text-muted-foreground hover:text-foreground transition-colors font-medium py-2 text-left"
              >
                {t("nav.privacyPolicy")}
              </button>
              <button
                onClick={() => { setIsMenuOpen(false); navigate("/terms-of-service"); window.scrollTo(0, 0); }}
                className="text-muted-foreground hover:text-foreground transition-colors font-medium py-2 text-left"
              >
                {t("nav.termsOfService")}
              </button>
              <button
                onClick={() => { setIsMenuOpen(false); navigate("/refund-policy"); window.scrollTo(0, 0); }}
                className="text-muted-foreground hover:text-foreground transition-colors font-medium py-2 text-left"
              >
                {t("nav.refundPolicy")}
              </button>
            </nav>
            <div className="flex flex-col gap-3">
              <Button
                variant="outline"
                onClick={toggleLanguage}
                className="w-full"
              >
                <Languages className="w-4 h-4 mr-2" />
                {language === "en" ? "हिंदी" : "English"}
              </Button>
              {isAuthenticated ? (
                <>
                  <div className="px-4 py-2 text-sm">
                    <p className="font-medium">{user?.name}</p>
                    <p className="text-muted-foreground text-xs">{user?.email}</p>
                  </div>
                  <Button variant="outline" className="w-full" onClick={() => { setIsMenuOpen(false); navigate("/profile"); window.scrollTo(0, 0); }}>
                    <User className="w-4 h-4 mr-2" />
                    {t("header.profile") || "Profile"}
                  </Button>
                  <Button variant="outline" className="w-full" onClick={() => { setIsMenuOpen(false); handleLogout(); }}>
                    <LogOut className="w-4 h-4 mr-2" />
                    {t("header.logout") || "Logout"}
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" className="w-full" onClick={() => { setIsMenuOpen(false); navigate("/login"); window.scrollTo(0, 0); }}>{t("header.login")}</Button>
                  <Button className="w-full" onClick={() => { setIsMenuOpen(false); navigate("/register-user"); window.scrollTo(0, 0); }}>{t("header.getStarted")}</Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
