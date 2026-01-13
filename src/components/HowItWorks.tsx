import { MapPin, UserCheck, Calendar } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import VantaBackground from "@/components/VantaBackground";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const HowItWorks = () => {
  const { t, language } = useLanguage();
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation({ threshold: 0.1 });

  const steps = [
    {
      icon: MapPin,
      step: "01",
      titleKey: "howItWorks.step1",
      descKey: "howItWorks.step1Desc",
    },
    {
      icon: UserCheck,
      step: "02",
      titleKey: "howItWorks.step2",
      descKey: "howItWorks.step2Desc",
    },
    {
      icon: Calendar,
      step: "03",
      titleKey: "howItWorks.step3",
      descKey: "howItWorks.step3Desc",
    },
  ];

  return (
    <section id="how-it-works" ref={sectionRef} className="relative py-16 md:py-24 overflow-hidden">
      <VantaBackground color={0x60606} waveSpeed={1.0} zoom={1.0} />
      <div className="container relative z-10">
        {/* Section Header */}
        <div className={`text-center max-w-2xl mx-auto mb-12 md:mb-16 transition-all duration-700 ${sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className={`text-primary font-semibold text-sm uppercase tracking-wider mb-3 block ${language === 'hi' ? 'font-hindi' : ''}`}>
            {t("howItWorks.title")}
          </span>
          <h2 className={`font-display text-3xl md:text-4xl font-bold text-foreground mb-4 ${language === 'hi' ? 'font-hindi' : ''}`}>
            {t("howItWorks.heading")}
          </h2>
          <p className={`text-muted-foreground text-lg ${language === 'hi' ? 'font-hindi' : ''}`}>
            {t("howItWorks.description")}
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 relative">
          {/* Arrows for desktop */}
          <div className={`hidden md:flex absolute top-24 left-1/4 right-1/4 items-center justify-between transition-all duration-700 delay-300 ${sectionVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
            <div className="flex justify-center">
              <svg className="w-6 h-6 text-border" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
            <div className="flex justify-center">
              <svg className="w-6 h-6 text-border" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>

          {steps.map((step, index) => {
            const { ref: stepRef, isVisible: stepVisible } = useScrollAnimation<HTMLDivElement>({ 
              threshold: 0.1, 
              rootMargin: '0px 0px -50px 0px' 
            });
            
            return (
              <div key={step.step} ref={stepRef} className={`relative text-center transition-all duration-700 ${stepVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: `${index * 150}ms` }}>
                {/* Step number badge */}
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-card shadow-card mb-6 relative z-10">
                  <step.icon className="w-7 h-7 text-primary" />
                </div>
                
                {/* Step indicator */}
                <div className="absolute top-0 right-6 md:right-auto md:left-1/2 md:translate-x-8 md:-translate-y-1">
                  <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded-full">
                    {step.step}
                  </span>
                </div>

                <h3 className={`font-display text-xl font-semibold text-foreground mb-3 ${language === 'hi' ? 'font-hindi' : ''}`}>
                  {t(step.titleKey)}
                </h3>
                <p className={`text-muted-foreground max-w-xs mx-auto ${language === 'hi' ? 'font-hindi' : ''}`}>
                  {t(step.descKey)}
                </p>

                {/* Mobile arrow */}
                {index < steps.length - 1 && (
                  <div className={`md:hidden flex justify-center my-6 transition-all duration-700 ${stepVisible ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: `${(index * 150) + 300}ms` }}>
                    <svg className="w-6 h-6 text-border" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
