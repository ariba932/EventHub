import React from "react";
import { Link } from "react-router-dom";
import {
  Bell,
  Calendar,
  MessageSquare,
  Menu,
  User,
  Settings,
  LogOut,
  HelpCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface HeaderProps {
  userName?: string;
  userAvatar?: string;
  notificationCount?: number;
  onMenuToggle?: () => void;
}

const Header = ({
  userName = "John Doe",
  userAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
  notificationCount = 3,
  onMenuToggle = () => {},
}: HeaderProps) => {
  return (
    <header className="w-full h-[72px] border-b bg-background flex items-center justify-between px-4 md:px-6 sticky top-0 z-10">
      {/* Left section with logo and mobile menu */}
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden mr-2"
          onClick={onMenuToggle}
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>

        <Link to="/" className="flex items-center">
          <Calendar className="h-6 w-6 text-primary mr-2" />
          <span className="font-bold text-lg hidden sm:inline">
            Event Notifier
          </span>
        </Link>
      </div>

      {/* Center section with navigation links - visible on desktop */}
      <nav className="hidden md:flex items-center space-x-1">
        <Button variant="ghost" asChild>
          <Link to="/" className="flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            Events
          </Link>
        </Button>
        <Button variant="ghost" asChild>
          <Link to="/contacts" className="flex items-center">
            <User className="h-4 w-4 mr-2" />
            Contacts
          </Link>
        </Button>
        <Button variant="ghost" asChild>
          <Link to="/messages" className="flex items-center">
            <MessageSquare className="h-4 w-4 mr-2" />
            Messages
          </Link>
        </Button>
      </nav>

      {/* Right section with notifications and user profile */}
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {notificationCount > 0 && (
            <span className="absolute top-1 right-1 bg-destructive text-destructive-foreground text-xs rounded-full h-4 w-4 flex items-center justify-center">
              {notificationCount}
            </span>
          )}
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Avatar>
                <AvatarImage src={userAvatar} alt={userName} />
                <AvatarFallback>
                  {userName.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <div className="flex items-center justify-start gap-2 p-2">
              <div className="flex flex-col space-y-1 leading-none">
                <p className="font-medium">{userName}</p>
                <p className="text-xs text-muted-foreground">
                  user@example.com
                </p>
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <HelpCircle className="mr-2 h-4 w-4" />
              <span>Help</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
