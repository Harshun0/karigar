import { Button } from "@/components/ui/button";
import { Briefcase, TrendingUp, Clock, Shield } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";

const WorkerCTA = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const benefits = [
    {
      icon: Briefcase,
      titleKey: "workerCta.benefit1Title",
      descKey: "workerCta.benefit1Desc",
    },
    {
      icon: TrendingUp,
      titleKey: "workerCta.benefit2Title",
      descKey: "workerCta.benefit2Desc",
    },
    {
      icon: Clock,
      titleKey: "workerCta.benefit3Title",
      descKey: "workerCta.benefit3Desc",
    },
    {
      icon: Shield,
      titleKey: "workerCta.benefit4Title",
      descKey: "workerCta.benefit4Desc",
    },
  ];

  return (
    <section id="for-workers" className="py-16 md:py-24 bg-background">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div>
            <span className="text-primary font-semibold text-sm uppercase tracking-wider mb-3 block">
              {t("workerCta.title")}
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight">
              {t("workerCta.heading")}
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-lg">
              {t("workerCta.description")}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="xl" onClick={() => navigate("/register-worker")}>
                {t("workerCta.register")}
              </Button>
              <Button variant="outline" size="xl" className="border-foreground/20 text-foreground hover:bg-foreground/10 hover:border-foreground/40">
                {t("workerCta.learnMore")}
              </Button>
            </div>
          </div>

          {/* Right Content - Benefits Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {benefits.map((benefit) => (
              <div
                key={benefit.titleKey}
                className="p-6 rounded-2xl bg-background/50 border border-border hover:bg-background/70 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-4">
                  <benefit.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-foreground">{t(benefit.titleKey)}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {t(benefit.descKey)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkerCTA;
