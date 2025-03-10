import React from "react";
import { ThumbsUp, ThumbsDown, Copy, Edit, Send } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface MessageSuggestion {
  id: string;
  text: string;
  tone: "casual" | "formal" | "friendly" | "professional";
}

interface MessageSuggestionsProps {
  suggestions?: MessageSuggestion[];
  onSelect?: (suggestion: MessageSuggestion) => void;
  onEdit?: (suggestion: MessageSuggestion) => void;
  onFeedback?: (suggestion: MessageSuggestion, liked: boolean) => void;
}

const MessageSuggestions = ({
  suggestions = [
    {
      id: "1",
      text: "Happy birthday! Wishing you a fantastic day filled with joy and laughter. May this year bring you all the happiness you deserve!",
      tone: "friendly",
    },
    {
      id: "2",
      text: "Congratulations on your anniversary! It's been wonderful to see your journey together. Here's to many more years of happiness!",
      tone: "casual",
    },
    {
      id: "3",
      text: "I wanted to extend my warmest congratulations on your recent promotion. Your hard work and dedication have truly paid off.",
      tone: "professional",
    },
  ],
  onSelect = () => {},
  onEdit = () => {},
  onFeedback = () => {},
}: MessageSuggestionsProps) => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // In a real implementation, you would show a toast notification here
  };

  const getToneColor = (tone: MessageSuggestion["tone"]) => {
    switch (tone) {
      case "casual":
        return "bg-blue-100 text-blue-800";
      case "formal":
        return "bg-purple-100 text-purple-800";
      case "friendly":
        return "bg-green-100 text-green-800";
      case "professional":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  return (
    <div className="w-full bg-white p-4 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Message Suggestions</h3>
      <div className="space-y-4">
        {suggestions.map((suggestion) => (
          <Card
            key={suggestion.id}
            className="overflow-hidden border-l-4 border-l-primary"
          >
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <span
                  className={`text-xs px-2 py-1 rounded-full ${getToneColor(suggestion.tone)}`}
                >
                  {suggestion.tone.charAt(0).toUpperCase() +
                    suggestion.tone.slice(1)}
                </span>
                <div className="flex space-x-1">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => onFeedback(suggestion, true)}
                        >
                          <ThumbsUp className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Like this suggestion</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => onFeedback(suggestion, false)}
                        >
                          <ThumbsDown className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Dislike this suggestion</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
              <p className="text-sm mt-2">{suggestion.text}</p>
            </CardContent>
            <CardFooter className="bg-gray-50 p-2 flex justify-end space-x-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs"
                      onClick={() => copyToClipboard(suggestion.text)}
                    >
                      <Copy className="h-3 w-3 mr-1" />
                      Copy
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Copy to clipboard</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs"
                      onClick={() => onEdit(suggestion)}
                    >
                      <Edit className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Edit this message</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="primary"
                      size="sm"
                      className="text-xs"
                      onClick={() => onSelect(suggestion)}
                    >
                      <Send className="h-3 w-3 mr-1" />
                      Use
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Use this message</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MessageSuggestions;
