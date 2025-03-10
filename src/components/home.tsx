import React, { useState } from "react";
import { Sparkles, Plus, Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import Header from "./layout/Header";
import DashboardTabs from "./dashboard/DashboardTabs";
import EventForm from "./events/EventForm";
import ContactForm from "./contacts/ContactForm";

const Home = () => {
  const [isMessageGeneratorOpen, setIsMessageGeneratorOpen] = useState(false);
  const [isEventFormOpen, setIsEventFormOpen] = useState(false);
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("events");

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleQuickAction = (action: string) => {
    switch (action) {
      case "message":
        setIsMessageGeneratorOpen(true);
        break;
      case "event":
        setIsEventFormOpen(true);
        break;
      case "contact":
        setIsContactFormOpen(true);
        break;
      default:
        break;
    }
  };

  // Dynamically import MessageGenerator to avoid import errors
  const MessageGenerator = React.lazy(() => import("./ai/MessageGenerator"));

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 flex flex-col">
        {/* Quick Actions Bar */}
        <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-[72px] z-10">
          <div className="container mx-auto py-2 px-4">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-semibold">Dashboard</h1>
              <div className="flex space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleQuickAction("message")}
                >
                  <Sparkles className="mr-2 h-4 w-4 text-primary" />
                  Generate Message
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleQuickAction("event")}
                >
                  <CalendarIcon className="mr-2 h-4 w-4 text-primary" />
                  Add Event
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleQuickAction("contact")}
                >
                  <Plus className="mr-2 h-4 w-4 text-primary" />
                  Add Contact
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="flex-1 container mx-auto px-4 py-6">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Upcoming Events
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">
                  3 events this week
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Contacts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">48</div>
                <p className="text-xs text-muted-foreground">
                  +5 from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Messages Sent
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">This month</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Dashboard Tabs */}
          <div className="bg-card rounded-lg border shadow-sm overflow-hidden h-[calc(100vh-320px)]">
            <DashboardTabs
              defaultTab={activeTab}
              onTabChange={handleTabChange}
            />
          </div>
        </div>
      </main>

      {/* Modals */}
      {isMessageGeneratorOpen && (
        <React.Suspense fallback={<div>Loading...</div>}>
          <MessageGenerator
            isOpen={isMessageGeneratorOpen}
            onClose={() => setIsMessageGeneratorOpen(false)}
          />
        </React.Suspense>
      )}

      {isEventFormOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background p-4 rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <EventForm
              onSubmit={() => setIsEventFormOpen(false)}
              onCancel={() => setIsEventFormOpen(false)}
            />
          </div>
        </div>
      )}

      {isContactFormOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background p-4 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <ContactForm
              onSubmit={() => setIsContactFormOpen(false)}
              onCancel={() => setIsContactFormOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
