import { Hammer, Wrench, Zap, PaintBucket, HardHat, Sparkles, Palette, Key, Car } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CometCard } from "@/components/ui/comet-card";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

// Service Card Component
const ServiceCard = ({ service, index, t, handleServiceClick }: {
  service: any;
  index: number;
  t: any;
  handleServiceClick: (serviceValue: string) => void;
}) => {
  const { ref: cardRef, isVisible: cardVisible } = useScrollAnimation<HTMLDivElement>({ 
    threshold: 0.1, 
    rootMargin: '0px 0px -50px 0px' 
  });

  return (
    <CometCard key={service.titleKey}>
      <article
        ref={cardRef}
        onClick={() => handleServiceClick(service.value)}
        className={`bg-card rounded-2xl p-6 md:p-8 shadow-soft cursor-pointer border border-transparent hover:border-primary/10 transition-all duration-700 ${cardVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        style={{ transitionDelay: `${index * 100}ms` }}
      >
        <div className={`w-14 h-14 rounded-xl ${service.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
          <service.icon className="w-7 h-7" />
        </div>
        <h3 className="font-display text-xl font-semibold text-foreground mb-2">
          {t(service.titleKey)}
        </h3>
        <p className="text-muted-foreground leading-relaxed">
          {t(service.descKey)}
        </p>
        <div className="mt-4 flex items-center text-primary font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span>{t("services.find")} {t(service.titleKey)}</span>
          <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </article>
    </CometCard>
  );
};

const Services = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [showAll, setShowAll] = useState(false);
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation({ threshold: 0.1 });

  const allServices = [
    {
      icon: Hammer,
      titleKey: "services.carpenter",
      descKey: "services.carpenterDesc",
      color: "bg-amber-900/20 text-amber-400",
      value: "carpenter",
    },
    {
      icon: Wrench,
      titleKey: "services.plumber",
      descKey: "services.plumberDesc",
      color: "bg-blue-900/20 text-blue-400",
      value: "plumber",
    },
    {
      icon: PaintBucket,
      titleKey: "services.painter",
      descKey: "services.painterDesc",
      color: "bg-rose-900/20 text-rose-400",
      value: "painter",
    },
    {
      icon: HardHat,
      titleKey: "services.dailyLabour",
      descKey: "services.dailyLabourDesc",
      color: "bg-slate-700/20 text-slate-300",
      value: "dailyLabour",
    },
    {
      icon: Sparkles,
      titleKey: "services.cleaning",
      descKey: "services.cleaningDesc",
      color: "bg-teal-900/20 text-teal-400",
      value: "cleaning",
    },
    {
      icon: Zap,
      titleKey: "services.electrician",
      descKey: "services.electricianDesc",
      color: "bg-yellow-900/20 text-yellow-400",
      value: "electrician",
    },
    {
      icon: Palette,
      titleKey: "services.makeupArtist",
      descKey: "services.makeupArtistDesc",
      color: "bg-pink-900/20 text-pink-400",
      value: "makeupArtist",
    },
    {
      icon: Key,
      titleKey: "services.locksmith",
      descKey: "services.locksmithDesc",
      color: "bg-purple-900/20 text-purple-400",
      value: "locksmith",
    },
    {
      icon: Car,
      titleKey: "services.carMechanic",
      descKey: "services.carMechanicDesc",
      color: "bg-orange-900/20 text-orange-400",
      value: "carMechanic",
    },
  ];

  const services = showAll ? allServices : allServices.slice(0, 6);

  const handleServiceClick = (serviceValue: string) => {
    console.log('Service clicked:', serviceValue);
    navigate(`/workers?service=${encodeURIComponent(serviceValue)}`);
  };

  const handleShowMoreClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    console.log('Show More clicked, current showAll:', showAll);
    setShowAll(!showAll);
  };

  return (
    <section id="services" ref={sectionRef} className="py-16 md:py-24 bg-background">
      <div className="container">
        {/* Section Header */}
        <div className={`text-center max-w-2xl mx-auto mb-12 md:mb-16 transition-all duration-700 ${sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="text-primary font-semibold text-sm uppercase tracking-wider mb-3 block">
            {t("services.title")}
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t("services.heading")}
          </h2>
          <p className="text-muted-foreground text-lg">
            {t("services.description")}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {services.map((service, index) => (
            <ServiceCard 
              key={service.titleKey}
              service={service}
              index={index}
              t={t}
              handleServiceClick={handleServiceClick}
            />
          ))}
        </div>

        {/* Show More/Less Button */}
        {allServices.length > 6 && (
          <div className={`flex justify-center mt-8 transition-all duration-700 delay-300 ${sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <Button
              variant="outline"
              onClick={handleShowMoreClick}
              className="px-8"
            >
              {showAll ? t("services.showLess") : t("services.showMore")}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Services;
