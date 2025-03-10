import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ = () => {
  const faqs: FAQItem[] = [
    {
      question: "How does the AI message generation work?",
      answer:
        "Our AI analyzes your relationship with the contact, the event type, and your communication history to generate personalized message suggestions. You can customize the tone, length, and style to match your preferences.",
    },
    {
      question: "Which messaging channels are supported?",
      answer:
        "We currently support SMS, WhatsApp, and Telegram for message delivery. You can select the preferred channel for each contact or choose on a per-message basis.",
    },
    {
      question: "Can I schedule messages in advance?",
      answer:
        "Yes! You can schedule messages to be sent at any future date and time. This is perfect for planning ahead for birthdays, anniversaries, and other important events.",
    },
    {
      question: "Is my data secure and private?",
      answer:
        "Absolutely. We use industry-standard encryption and security practices to protect your data. Your contacts and messages are private and never used for training our AI without explicit permission.",
    },
    {
      question: "Can I import contacts from my phone or other services?",
      answer:
        "Yes, you can import contacts from CSV files, Google Contacts, and other popular contact management systems. We also support manual entry and editing.",
    },
    {
      question: "What happens if I exceed my plan's limits?",
      answer:
        "You'll receive a notification when you're approaching your plan's limits. You can upgrade at any time to continue using all features without interruption.",
    },
  ];

  return (
    <section className="py-20 bg-background" id="faq">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about our service
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
