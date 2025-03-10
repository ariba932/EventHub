import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Plus, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Define the form schema with zod
const formSchema = z.object({
  title: z.string().min(2, { message: "Title must be at least 2 characters" }),
  date: z.date({ required_error: "Event date is required" }),
  category: z.enum(["birthday", "anniversary", "holiday", "other"], {
    required_error: "Please select a category",
  }),
  contacts: z
    .array(z.string())
    .min(1, { message: "Select at least one contact" }),
  reminder: z.boolean().default(false),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface Contact {
  id: string;
  name: string;
}

interface EventFormProps {
  event?: {
    id?: string;
    title: string;
    date: Date;
    category: "birthday" | "anniversary" | "holiday" | "other";
    contacts: string[];
    reminder: boolean;
    notes?: string;
  };
  contacts?: Contact[];
  onSubmit?: (values: FormValues) => void;
  onCancel?: () => void;
  isOpen?: boolean;
}

const EventForm = ({
  event = {
    title: "",
    date: new Date(),
    category: "birthday" as const,
    contacts: [],
    reminder: false,
    notes: "",
  },
  contacts = [
    { id: "1", name: "John Doe" },
    { id: "2", name: "Jane Smith" },
    { id: "3", name: "Robert Johnson" },
    { id: "4", name: "Emily Davis" },
    { id: "5", name: "Michael Wilson" },
  ],
  onSubmit = () => {},
  onCancel = () => {},
  isOpen = true,
}: EventFormProps) => {
  const [selectedContacts, setSelectedContacts] = useState<string[]>(
    event.contacts || [],
  );
  const [contactInput, setContactInput] = useState("");

  // Initialize the form with default values
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: event.title,
      date: event.date,
      category: event.category,
      contacts: event.contacts,
      reminder: event.reminder,
      notes: event.notes || "",
    },
  });

  // Handle form submission
  const handleSubmit = (values: FormValues) => {
    onSubmit(values);
  };

  // Add a contact to the selected contacts list
  const addContact = (contactId: string) => {
    if (!selectedContacts.includes(contactId)) {
      const newContacts = [...selectedContacts, contactId];
      setSelectedContacts(newContacts);
      form.setValue("contacts", newContacts);
    }
    setContactInput("");
  };

  // Remove a contact from the selected contacts list
  const removeContact = (contactId: string) => {
    const newContacts = selectedContacts.filter((id) => id !== contactId);
    setSelectedContacts(newContacts);
    form.setValue("contacts", newContacts);
  };

  // Get contact name by ID
  const getContactName = (contactId: string) => {
    const contact = contacts.find((c) => c.id === contactId);
    return contact ? contact.name : "Unknown Contact";
  };

  // Filter contacts based on input
  const filteredContacts = contacts.filter(
    (contact) =>
      !selectedContacts.includes(contact.id) &&
      contact.name.toLowerCase().includes(contactInput.toLowerCase()),
  );

  return (
    <Card className="w-full max-w-md mx-auto bg-background">
      <CardHeader>
        <CardTitle>{event.id ? "Edit Event" : "Add New Event"}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter event title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Event Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className="w-full pl-3 text-left font-normal flex justify-between items-center"
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date("1900-01-01")}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="birthday">Birthday</SelectItem>
                      <SelectItem value="anniversary">Anniversary</SelectItem>
                      <SelectItem value="holiday">Holiday</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="contacts"
              render={() => (
                <FormItem>
                  <FormLabel>Associated Contacts</FormLabel>
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-2 mb-2">
                      {selectedContacts.map((contactId) => (
                        <Badge
                          key={contactId}
                          variant="secondary"
                          className="flex items-center gap-1"
                        >
                          {getContactName(contactId)}
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-4 w-4 p-0 hover:bg-transparent"
                            onClick={() => removeContact(contactId)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </Badge>
                      ))}
                    </div>
                    <div className="relative">
                      <Input
                        placeholder="Search contacts..."
                        value={contactInput}
                        onChange={(e) => setContactInput(e.target.value)}
                      />
                      {contactInput && filteredContacts.length > 0 && (
                        <div className="absolute z-10 w-full mt-1 bg-background border rounded-md shadow-md max-h-48 overflow-y-auto">
                          {filteredContacts.map((contact) => (
                            <div
                              key={contact.id}
                              className="px-3 py-2 hover:bg-accent cursor-pointer"
                              onClick={() => addContact(contact.id)}
                            >
                              {contact.name}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    {selectedContacts.length === 0 && (
                      <div className="flex items-center justify-center p-4 border border-dashed rounded-md">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="text-xs"
                          onClick={() => setContactInput(" ")}
                        >
                          <Plus className="h-3 w-3 mr-1" />
                          Add contacts
                        </Button>
                      </div>
                    )}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="reminder"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                  <div className="space-y-0.5">
                    <FormLabel>Set Reminder</FormLabel>
                    <FormDescription>
                      Receive notifications before this event
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes (Optional)</FormLabel>
                  <FormControl>
                    <textarea
                      className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 min-h-[80px]"
                      placeholder="Add any additional notes about this event"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <CardFooter className="px-0 pt-2 flex justify-between">
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
              <Button type="submit">
                {event.id ? "Update Event" : "Create Event"}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default EventForm;
