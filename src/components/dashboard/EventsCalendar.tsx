import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  MoreHorizontal,
  Calendar as CalendarIcon,
  Bell,
  Edit,
  Trash2,
} from "lucide-react";

interface Event {
  id: string;
  title: string;
  date: Date;
  category: "birthday" | "anniversary" | "holiday" | "other";
  contacts: string[];
  reminder: boolean;
}

interface EventsCalendarProps {
  events?: Event[];
  onAddEvent?: () => void;
  onEditEvent?: (eventId: string) => void;
  onDeleteEvent?: (eventId: string) => void;
  onSelectEvent?: (event: Event) => void;
}

const EventsCalendar = ({
  events = [
    {
      id: "1",
      title: "Sarah's Birthday",
      date: new Date(new Date().getFullYear(), new Date().getMonth(), 15),
      category: "birthday",
      contacts: ["Sarah Johnson"],
      reminder: true,
    },
    {
      id: "2",
      title: "Wedding Anniversary",
      date: new Date(new Date().getFullYear(), new Date().getMonth(), 22),
      category: "anniversary",
      contacts: ["Mike & Lisa"],
      reminder: true,
    },
    {
      id: "3",
      title: "Team Lunch",
      date: new Date(new Date().getFullYear(), new Date().getMonth(), 10),
      category: "other",
      contacts: ["Work Team"],
      reminder: false,
    },
  ] as Event[],
  onAddEvent = () => {},
  onEditEvent = () => {},
  onDeleteEvent = () => {},
  onSelectEvent = () => {},
}: EventsCalendarProps) => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isEventDetailsOpen, setIsEventDetailsOpen] = useState(false);

  // Get current month and year
  const currentMonth = currentDate.toLocaleString("default", { month: "long" });
  const currentYear = currentDate.getFullYear();

  // Navigate to previous month
  const goToPreviousMonth = () => {
    const previousMonth = new Date(currentDate);
    previousMonth.setMonth(previousMonth.getMonth() - 1);
    setCurrentDate(previousMonth);
  };

  // Navigate to next month
  const goToNextMonth = () => {
    const nextMonth = new Date(currentDate);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    setCurrentDate(nextMonth);
  };

  // Get events for a specific date
  const getEventsForDate = (date: Date) => {
    return events.filter(
      (event) =>
        event.date.getDate() === date.getDate() &&
        event.date.getMonth() === date.getMonth() &&
        event.date.getFullYear() === date.getFullYear(),
    );
  };

  // Handle event selection
  const handleEventSelect = (event: Event) => {
    setSelectedEvent(event);
    setIsEventDetailsOpen(true);
    onSelectEvent(event);
  };

  // Get category color
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "birthday":
        return "bg-pink-500";
      case "anniversary":
        return "bg-blue-500";
      case "holiday":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  // Render day cell with events
  const renderDay = (day: Date) => {
    const dayEvents = getEventsForDate(day);
    return (
      <div className="relative w-full h-full">
        <div className="text-center">{day.getDate()}</div>
        {dayEvents.length > 0 && (
          <div className="mt-1 space-y-1 max-h-16 overflow-y-auto">
            {dayEvents.map((event) => (
              <div
                key={event.id}
                className={`text-xs p-1 rounded cursor-pointer ${getCategoryColor(event.category)} text-white truncate`}
                onClick={() => handleEventSelect(event)}
              >
                {event.title}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  // Upcoming events section
  const upcomingEvents = [...events]
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .filter((event) => event.date >= new Date())
    .slice(0, 5);

  return (
    <div className="w-full h-full p-4 bg-background flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-2">
          <CalendarIcon className="h-6 w-6" />
          <h2 className="text-2xl font-bold">Events Calendar</h2>
        </div>
        <Button onClick={onAddEvent}>
          <Plus className="mr-2 h-4 w-4" /> Add Event
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-grow">
        {/* Calendar Section */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={goToPreviousMonth}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <h3 className="text-xl font-medium">
                  {currentMonth} {currentYear}
                </h3>
                <Button variant="outline" size="icon" onClick={goToNextMonth}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex space-x-2">
                <Badge
                  variant="outline"
                  className="flex items-center space-x-1"
                >
                  <div className="w-2 h-2 rounded-full bg-pink-500"></div>
                  <span>Birthday</span>
                </Badge>
                <Badge
                  variant="outline"
                  className="flex items-center space-x-1"
                >
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <span>Anniversary</span>
                </Badge>
                <Badge
                  variant="outline"
                  className="flex items-center space-x-1"
                >
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span>Holiday</span>
                </Badge>
                <Badge
                  variant="outline"
                  className="flex items-center space-x-1"
                >
                  <div className="w-2 h-2 rounded-full bg-gray-500"></div>
                  <span>Other</span>
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="calendar-container">
              <Calendar
                mode="single"
                selected={currentDate}
                onSelect={(date) => date && setCurrentDate(date)}
                className="rounded-md border w-full"
                month={currentDate}
                showOutsideDays={true}
              />
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Events Section */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingEvents.length > 0 ? (
                upcomingEvents.map((event) => (
                  <div
                    key={event.id}
                    className="flex items-start space-x-3 p-3 rounded-lg border hover:bg-accent/50 cursor-pointer"
                    onClick={() => handleEventSelect(event)}
                  >
                    <div
                      className={`w-3 h-3 rounded-full mt-1.5 ${getCategoryColor(event.category)}`}
                    ></div>
                    <div className="flex-1">
                      <h4 className="font-medium">{event.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {event.date.toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                      <div className="text-xs text-muted-foreground mt-1">
                        {event.contacts.join(", ")}
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onEditEvent(event.id)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => onDeleteEvent(event.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-muted-foreground">
                  No upcoming events
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Event Details Dialog */}
      <Dialog open={isEventDetailsOpen} onOpenChange={setIsEventDetailsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedEvent?.title}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            {selectedEvent && (
              <>
                <div className="flex items-center space-x-2">
                  <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                  <span>
                    {selectedEvent.date.toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={getCategoryColor(selectedEvent.category)}>
                    {selectedEvent.category.charAt(0).toUpperCase() +
                      selectedEvent.category.slice(1)}
                  </Badge>
                  {selectedEvent.reminder && (
                    <Badge variant="outline" className="flex items-center">
                      <Bell className="mr-1 h-3 w-3" />
                      Reminder set
                    </Badge>
                  )}
                </div>
                <div className="pt-2 border-t">
                  <h4 className="text-sm font-medium mb-1">Contacts</h4>
                  <div className="text-sm text-muted-foreground">
                    {selectedEvent.contacts.join(", ")}
                  </div>
                </div>
                <div className="flex space-x-2 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => onEditEvent(selectedEvent.id)}
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => {
                      onDeleteEvent(selectedEvent.id);
                      setIsEventDetailsOpen(false);
                    }}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EventsCalendar;
