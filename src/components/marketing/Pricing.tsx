import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check } from "lucide-react";
import AuthModal from "@/components/auth/AuthModal";

interface PricingTier {
  name: string;
  price: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  buttonText: string;
}

const Pricing = () => {
  const tiers: PricingTier[] = [
    {
      name: "Free",
      price: "$0",
      description: "Perfect for getting started with basic event management.",
      features: [
        "Up to 50 contacts",
        "Basic event calendar",
        "Simple message templates",
        "SMS delivery only",
        "Email support",
      ],
      buttonText: "Sign Up Free",
    },
    {
      name: "Premium",
      price: "$9.99",
      description: "Everything you need for personal event management.",
      features: [
        "Unlimited contacts",
        "Advanced event calendar",
        "AI message generation",
        "Multi-channel delivery",
        "Message scheduling",
        "Priority support",
      ],
      highlighted: true,
      buttonText: "Start Premium",
    },
    {
      name: "Family",
      price: "$19.99",
      description:
        "Share with up to 5 family members for collaborative event management.",
      features: [
        "Everything in Premium",
        "Up to 5 user accounts",
        "Shared contacts & events",
        "Collaborative messaging",
        "Advanced analytics",
        "24/7 priority support",
      ],
      buttonText: "Get Family Plan",
    },
  ];

  return (
    <section className="py-20 bg-muted/30" id="pricing">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that works best for you and your needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {tiers.map((tier, index) => (
            <Card
              key={index}
              className={`flex flex-col ${tier.highlighted ? "border-primary shadow-lg relative" : "border-border"}`}
            >
              {tier.highlighted && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground text-xs font-medium py-1 px-3 rounded-full">
                  Most Popular
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-xl">{tier.name}</CardTitle>
                <div className="mt-2">
                  <span className="text-3xl font-bold">{tier.price}</span>
                  <span className="text-muted-foreground ml-1">/month</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  {tier.description}
                </p>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-3">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="h-5 w-5 text-primary shrink-0 mr-2" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <AuthModal
                  defaultMode="signup"
                  triggerButton={
                    <Button
                      className="w-full"
                      variant={tier.highlighted ? "default" : "outline"}
                    >
                      {tier.buttonText}
                    </Button>
                  }
                />
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
