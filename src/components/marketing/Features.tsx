import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Sparkles,
  Calendar,
  Users,
  MessageSquare,
  Send,
  Bell,
} from "lucide-react";

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Features = () => {
  const features: Feature[] = [
    {
      icon: <Calendar className="h-10 w-10 text-primary" />,
      title: "Event Calendar",
      description:
        "Visual calendar with color-coded events and customizable reminders for birthdays, anniversaries, and more.",
    },
    {
      icon: <Users className="h-10 w-10 text-primary" />,
      title: "Contact Management",
      description:
        "Organize contacts with relationship categories and preferred communication channels.",
    },
    {
      icon: <Sparkles className="h-10 w-10 text-primary" />,
      title: "AI Message Generator",
      description:
        "Create personalized messages based on relationship context, event type, and communication history.",
    },
    {
      icon: <Send className="h-10 w-10 text-primary" />,
      title: "Multi-Channel Delivery",
      description:
        "Send messages via SMS, WhatsApp, or Telegram directly from the app with scheduling options.",
    },
    {
      icon: <Bell className="h-10 w-10 text-primary" />,
      title: "Smart Reminders",
      description:
        "Never miss important dates with customizable notification schedules and priority settings.",
    },
    {
      icon: <MessageSquare className="h-10 w-10 text-primary" />,
      title: "Message History",
      description:
        "Keep track of all your sent messages and use them as templates for future communications.",
    },
  ];

  return (
    <section className="py-20 bg-muted/30" id="features">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            Powerful Features
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to stay connected with the people who matter
            most
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border border-border bg-card hover:shadow-md transition-shadow"
            >
              <CardContent className="pt-6">
                <div className="rounded-full w-16 h-16 flex items-center justify-center bg-primary/10 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
