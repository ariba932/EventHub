import React, { useState } from "react";
import {
  Search,
  Plus,
  MoreHorizontal,
  Filter,
  UserPlus,
  Edit,
  Trash2,
  Mail,
  MessageSquare,
} from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  category: string;
  preferredChannel: string;
  events: Array<{
    name: string;
    date: string;
  }>;
  avatar?: string;
}

const ContactsList = ({
  contacts = mockContacts,
}: {
  contacts?: Contact[];
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  // Filter contacts based on search query and active category
  const filteredContacts = contacts.filter((contact) => {
    const matchesSearch =
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      activeCategory === "all" || contact.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="w-full h-full bg-background p-6">
      <div className="flex flex-col space-y-6">
        {/* Header with search and actions */}
        <div className="flex justify-between items-center">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search contacts..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Contact
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Contact</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <p className="text-sm text-muted-foreground">
                    Contact form would go here
                  </p>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Category tabs */}
        <Tabs
          defaultValue="all"
          value={activeCategory}
          onValueChange={setActiveCategory}
        >
          <TabsList className="w-full max-w-md justify-start">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="family">Family</TabsTrigger>
            <TabsTrigger value="friends">Friends</TabsTrigger>
            <TabsTrigger value="work">Work</TabsTrigger>
            <TabsTrigger value="other">Other</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Contacts grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredContacts.map((contact) => (
            <ContactCard key={contact.id} contact={contact} />
          ))}
        </div>

        {/* Empty state */}
        {filteredContacts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12">
            <UserPlus className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">No contacts found</h3>
            <p className="text-sm text-muted-foreground mt-1">
              {searchQuery
                ? "Try a different search term"
                : "Add your first contact to get started"}
            </p>
            <Button className="mt-4">
              <Plus className="h-4 w-4 mr-2" />
              Add Contact
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

const ContactCard = ({ contact }: { contact: Contact }) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-3">
            <Avatar>
              {contact.avatar ? (
                <AvatarImage src={contact.avatar} alt={contact.name} />
              ) : (
                <AvatarFallback>
                  {contact.name.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              )}
            </Avatar>
            <div>
              <CardTitle className="text-base">{contact.name}</CardTitle>
              <p className="text-sm text-muted-foreground">
                {contact.category}
              </p>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Edit className="h-4 w-4 mr-2" />
                Edit Contact
              </DropdownMenuItem>
              <DropdownMenuItem>
                <MessageSquare className="h-4 w-4 mr-2" />
                Generate Message
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Contact
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center text-sm">
            <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>{contact.email}</span>
          </div>
          <div className="flex items-center text-sm">
            <MessageSquare className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>{contact.phone}</span>
          </div>

          {/* Upcoming events */}
          {contact.events && contact.events.length > 0 && (
            <div className="mt-4">
              <h4 className="text-sm font-medium mb-2">Upcoming Events</h4>
              <div className="flex flex-wrap gap-2">
                {contact.events.map((event, index) => (
                  <Badge key={index} variant="secondary">
                    {event.name}: {new Date(event.date).toLocaleDateString()}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Preferred channel */}
          <div className="mt-3">
            <Badge variant="outline">Prefers {contact.preferredChannel}</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Mock data for contacts
const mockContacts: Contact[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    category: "family",
    preferredChannel: "SMS",
    events: [
      { name: "Birthday", date: "2023-06-15" },
      { name: "Anniversary", date: "2023-08-22" },
    ],
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "+1 (555) 987-6543",
    category: "friends",
    preferredChannel: "WhatsApp",
    events: [{ name: "Birthday", date: "2023-09-10" }],
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jane",
  },
  {
    id: "3",
    name: "Robert Johnson",
    email: "robert.johnson@example.com",
    phone: "+1 (555) 456-7890",
    category: "work",
    preferredChannel: "Telegram",
    events: [{ name: "Work Anniversary", date: "2023-07-05" }],
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=robert",
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily.davis@example.com",
    phone: "+1 (555) 234-5678",
    category: "friends",
    preferredChannel: "SMS",
    events: [{ name: "Birthday", date: "2023-11-18" }],
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emily",
  },
  {
    id: "5",
    name: "Michael Wilson",
    email: "michael.wilson@example.com",
    phone: "+1 (555) 876-5432",
    category: "family",
    preferredChannel: "WhatsApp",
    events: [
      { name: "Birthday", date: "2023-12-03" },
      { name: "Graduation", date: "2023-05-20" },
    ],
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
  },
  {
    id: "6",
    name: "Sarah Brown",
    email: "sarah.brown@example.com",
    phone: "+1 (555) 345-6789",
    category: "work",
    preferredChannel: "Telegram",
    events: [{ name: "Project Deadline", date: "2023-07-30" }],
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
  },
];

export default ContactsList;
