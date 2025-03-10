import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar as CalendarIcon,
  Users,
  MessageSquare,
  Bell,
} from "lucide-react";
import EventsCalendar from "./EventsCalendar";
import ContactsList from "./ContactsList";

interface DashboardTabsProps {
  defaultTab?: string;
  onTabChange?: (tab: string) => void;
}

const DashboardTabs = ({
  defaultTab = "events",
  onTabChange = () => {},
}: DashboardTabsProps) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    onTabChange(value);
  };

  return (
    <div className="w-full h-full bg-background">
      <Tabs
        defaultValue={defaultTab}
        value={activeTab}
        onValueChange={handleTabChange}
        className="w-full h-full flex flex-col"
      >
        <div className="border-b px-6 py-2">
          <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto">
            <TabsTrigger value="events" className="flex items-center">
              <CalendarIcon className="h-4 w-4 mr-2" />
              Events
            </TabsTrigger>
            <TabsTrigger value="contacts" className="flex items-center">
              <Users className="h-4 w-4 mr-2" />
              Contacts
            </TabsTrigger>
            <TabsTrigger value="messages" className="flex items-center">
              <MessageSquare className="h-4 w-4 mr-2" />
              Messages
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent
          value="events"
          className="flex-1 overflow-auto"
          style={{ height: "calc(100% - 56px)" }}
        >
          <EventsCalendar />
        </TabsContent>

        <TabsContent
          value="contacts"
          className="flex-1 overflow-auto"
          style={{ height: "calc(100% - 56px)" }}
        >
          <ContactsList />
        </TabsContent>

        <TabsContent
          value="messages"
          className="flex-1 overflow-auto p-6"
          style={{ height: "calc(100% - 56px)" }}
        >
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="bg-primary/10 p-6 rounded-full mb-4">
              <MessageSquare className="h-12 w-12 text-primary" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Message Center</h2>
            <p className="text-muted-foreground max-w-md mb-6">
              View your sent messages and drafts. Create new messages for your
              contacts using our AI-powered message generator.
            </p>
            <div className="flex space-x-4">
              <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                <MessageSquare className="h-4 w-4 mr-2" />
                New Message
              </button>
              <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
                <Bell className="h-4 w-4 mr-2" />
                View Notifications
              </button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardTabs;
