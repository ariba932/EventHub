import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { CalendarIcon, Clock, Send, MessageSquare } from "lucide-react";

interface DeliveryOptionsProps {
  message?: string;
  onSend?: (channel: string, scheduledTime?: Date) => void;
  onCancel?: () => void;
  isOpen?: boolean;
}

const DeliveryOptions = ({
  message = "Happy birthday! Wishing you a fantastic day filled with joy and celebration.",
  onSend = () => {},
  onCancel = () => {},
  isOpen = true,
}: DeliveryOptionsProps) => {
  const [selectedChannel, setSelectedChannel] = useState<string>("sms");
  const [scheduleMode, setScheduleMode] = useState<"now" | "later">("now");
  const [scheduledDate, setScheduledDate] = useState<Date | undefined>(
    new Date(),
  );
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const handleSend = () => {
    onSend(
      selectedChannel,
      scheduleMode === "later" ? scheduledDate : undefined,
    );
  };

  return (
    <div className="bg-white rounded-lg p-4 w-full">
      <Tabs defaultValue="channel" className="w-full">
        <TabsList className="grid grid-cols-2 w-full mb-4">
          <TabsTrigger value="channel">
            <MessageSquare className="h-4 w-4 mr-2" />
            Channel
          </TabsTrigger>
          <TabsTrigger value="schedule">
            <Clock className="h-4 w-4 mr-2" />
            Schedule
          </TabsTrigger>
        </TabsList>

        <TabsContent value="channel" className="space-y-4">
          <div className="grid gap-4">
            <div>
              <h3 className="text-sm font-medium mb-2">
                Select messaging channel
              </h3>
              <Select
                value={selectedChannel}
                onValueChange={setSelectedChannel}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select channel" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sms">SMS</SelectItem>
                  <SelectItem value="whatsapp">WhatsApp</SelectItem>
                  <SelectItem value="telegram">Telegram</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="bg-gray-50 p-3 rounded-md">
              <h4 className="text-xs font-medium text-gray-500 mb-1">
                Preview
              </h4>
              <p className="text-sm">{message}</p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-4">
          <div className="grid gap-4">
            <div className="flex items-center space-x-2">
              <Button
                variant={scheduleMode === "now" ? "default" : "outline"}
                size="sm"
                onClick={() => setScheduleMode("now")}
              >
                Send now
              </Button>
              <Button
                variant={scheduleMode === "later" ? "default" : "outline"}
                size="sm"
                onClick={() => setScheduleMode("later")}
              >
                Schedule for later
              </Button>
            </div>

            {scheduleMode === "later" && (
              <div className="flex flex-col space-y-2">
                <div className="flex items-center space-x-2">
                  <Popover
                    open={isCalendarOpen}
                    onOpenChange={setIsCalendarOpen}
                  >
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {scheduledDate
                          ? format(scheduledDate, "PPP")
                          : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={scheduledDate}
                        onSelect={(date) => {
                          setScheduledDate(date);
                          setIsCalendarOpen(false);
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div>
                  <Select defaultValue="9">
                    <SelectTrigger>
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="9">9:00 AM</SelectItem>
                      <SelectItem value="12">12:00 PM</SelectItem>
                      <SelectItem value="15">3:00 PM</SelectItem>
                      <SelectItem value="18">6:00 PM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end space-x-2 mt-6">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={handleSend}>
          <Send className="h-4 w-4 mr-2" />
          {scheduleMode === "now" ? "Send now" : "Schedule"}
        </Button>
      </div>
    </div>
  );
};

export default DeliveryOptions;
