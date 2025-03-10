import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  avatar: string;
}

const Testimonials = () => {
  const testimonials: Testimonial[] = [
    {
      quote:
        "This app has transformed how I stay in touch with friends and family. The AI-generated messages are surprisingly personal and thoughtful.",
      author: "Sarah Johnson",
      role: "Marketing Director",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
    },
    {
      quote:
        "I used to forget important dates all the time. Now with the event calendar and reminders, I'm always prepared with the perfect message.",
      author: "Michael Chen",
      role: "Software Engineer",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
    },
    {
      quote:
        "The multi-channel delivery options make it so convenient. I can schedule messages in advance and they're sent automatically at the right time.",
      author: "Emily Rodriguez",
      role: "Event Planner",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emily",
    },
  ];

  return (
    <section className="py-20 bg-background" id="testimonials">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            What Our Users Say
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join thousands of satisfied users who never miss an important moment
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="bg-card border border-border hover:shadow-md transition-shadow"
            >
              <CardContent className="pt-6">
                <div className="flex flex-col h-full">
                  <div className="mb-4">
                    <svg
                      className="h-8 w-8 text-primary/40"
                      fill="currentColor"
                      viewBox="0 0 32 32"
                      aria-hidden="true"
                    >
                      <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                    </svg>
                  </div>
                  <p className="text-lg mb-6 flex-grow">{testimonial.quote}</p>
                  <div className="flex items-center">
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarImage
                        src={testimonial.avatar}
                        alt={testimonial.author}
                      />
                      <AvatarFallback>
                        {testimonial.author.substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{testimonial.author}</p>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
