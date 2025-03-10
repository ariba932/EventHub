import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import AuthForm from "./AuthForm";

type AuthMode = "signin" | "signup";

interface AuthModalProps {
  triggerButton?: React.ReactNode;
  defaultMode?: AuthMode;
  onSuccess?: () => void;
}

const AuthModal = ({
  triggerButton,
  defaultMode = "signin",
  onSuccess = () => {},
}: AuthModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<AuthMode>(defaultMode);

  const handleSuccess = () => {
    setIsOpen(false);
    onSuccess();
  };

  const toggleMode = () => {
    setMode(mode === "signin" ? "signup" : "signin");
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {triggerButton || <Button>Sign In</Button>}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {mode === "signin" ? "Sign In" : "Create an Account"}
          </DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <AuthForm
            mode={mode}
            onSuccess={handleSuccess}
            onToggleMode={toggleMode}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
