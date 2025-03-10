import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User, Phone, Mail, Calendar, MessageSquare, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";

// Form schema
const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(5, { message: "Please enter a valid phone number" }),
  category: z.string(),
  preferredChannel: z.string(),
  notes: z.string().optional(),
  birthday: z.string().optional(),
  anniversary: z.string().optional(),
  enableReminders: z.boolean().default(true),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

interface ContactFormProps {
  initialData?: ContactFormValues;
  onSubmit?: (data: ContactFormValues) => void;
  onCancel?: () => void;
  isEdit?: boolean;
}

const ContactForm = ({
  initialData,
  onSubmit = () => {},
  onCancel = () => {},
  isEdit = false,
}: ContactFormProps) => {
  const [avatar, setAvatar] = useState<string | null>(null);

  // Default form values
  const defaultValues: Partial<ContactFormValues> = {
    name: "",
    email: "",
    phone: "",
    category: "friends",
    preferredChannel: "sms",
    notes: "",
    birthday: "",
    anniversary: "",
    enableReminders: true,
    ...initialData,
  };

  // Initialize form
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues,
  });

  // Handle form submission
  const handleSubmit = (data: ContactFormValues) => {
    onSubmit(data);
  };

  // Generate avatar from name
  const generateAvatar = (name: string) => {
    if (name.length > 0) {
      const seed = name.replace(/\s+/g, "-").toLowerCase();
      setAvatar(`https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto bg-white">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{isEdit ? "Edit Contact" : "Add New Contact"}</CardTitle>
            <CardDescription>
              {isEdit
                ? "Update contact information and preferences"
                : "Enter contact details to add to your network"}
            </CardDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={onCancel}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <div className="flex flex-col md:flex-row gap-6">
              {/* Avatar and basic info */}
              <div className="md:w-1/3 flex flex-col items-center space-y-4">
                <Avatar className="w-24 h-24">
                  {avatar ? (
                    <AvatarImage src={avatar} alt="Contact avatar" />
                  ) : (
                    <AvatarFallback className="text-2xl">
                      {form.watch("name")
                        ? form
                            .watch("name")
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()
                            .substring(0, 2)
                        : "?"}
                    </AvatarFallback>
                  )}
                </Avatar>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => generateAvatar(form.watch("name"))}
                >
                  Generate Avatar
                </Button>
              </div>

              {/* Basic contact information */}
              <div className="md:w-2/3 space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input
                            placeholder="Full Name"
                            className="pl-10"
                            {...field}
                            onChange={(e) => {
                              field.onChange(e);
                              if (e.target.value && !avatar) {
                                generateAvatar(e.target.value);
                              }
                            }}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                              placeholder="Email Address"
                              type="email"
                              className="pl-10"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Phone className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                              placeholder="Phone Number"
                              className="pl-10"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Categories and preferences */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Categorization</h3>

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Relationship Category</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="family">Family</SelectItem>
                          <SelectItem value="friends">Friends</SelectItem>
                          <SelectItem value="work">Work</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="preferredChannel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preferred Messaging Channel</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select channel" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="sms">
                            <div className="flex items-center">
                              <MessageSquare className="h-4 w-4 mr-2" />
                              <span>SMS</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="whatsapp">
                            <div className="flex items-center">
                              <MessageSquare className="h-4 w-4 mr-2" />
                              <span>WhatsApp</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="telegram">
                            <div className="flex items-center">
                              <MessageSquare className="h-4 w-4 mr-2" />
                              <span>Telegram</span>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-medium">Important Dates</h3>

                <FormField
                  control={form.control}
                  name="birthday"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Birthday</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input type="date" className="pl-10" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="anniversary"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Anniversary</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input type="date" className="pl-10" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="enableReminders"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                      <div className="space-y-0.5">
                        <FormLabel>Enable Reminders</FormLabel>
                        <FormDescription>
                          Receive notifications before important dates
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
              </div>
            </div>

            <Separator />

            {/* Notes */}
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Add any additional information about this contact"
                      className="min-h-24"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Form actions */}
            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
              <Button type="submit">
                {isEdit ? "Update Contact" : "Add Contact"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ContactForm;
