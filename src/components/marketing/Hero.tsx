import React from "react";
import { Button } from "@/components/ui/button";
import AuthModal from "@/components/auth/AuthModal";

interface HeroProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  secondaryCtaText?: string;
  onSecondaryAction?: () => void;
}

const Hero = ({
  title = "Never Miss an Important Event Again",
  subtitle = "Personalized greetings for every occasion, powered by AI. Connect with your loved ones in a meaningful way, right on time.",
  ctaText = "Get Started",
  secondaryCtaText = "Learn More",
  onSecondaryAction = () => {},
}: HeroProps) => {
  return (
    <div className="relative overflow-hidden bg-background">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-background z-0" />

      <div className="container mx-auto px-4 py-24 sm:py-32 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
              {title}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 mb-8">
              {subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <AuthModal
                defaultMode="signup"
                triggerButton={
                  <Button size="lg" className="font-medium">
                    {ctaText}
                  </Button>
                }
              />
              <Button
                variant="outline"
                size="lg"
                className="font-medium"
                onClick={onSecondaryAction}
              >
                {secondaryCtaText}
              </Button>
            </div>
          </div>
          <div className="flex-1 w-full max-w-lg">
            <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-primary/20 to-background border border-border">
              <img
                src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&q=80"
                alt="Event Notification App"
                className="w-full h-full object-cover mix-blend-overlay"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="bg-card/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-border">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="text-primary">🎂</span>
                      </div>
                      <div>
                        <h3 className="font-medium">Sarah's Birthday</h3>
                        <p className="text-sm text-muted-foreground">
                          Tomorrow
                        </p>
                      </div>
                    </div>
                    <p className="text-sm">
                      "Happy birthday! Wishing you a fantastic day filled with
                      joy and laughter."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
