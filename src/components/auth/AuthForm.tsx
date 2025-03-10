import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signIn, signUp } from "@/lib/auth";
import { Loader2 } from "lucide-react";

type AuthMode = "signin" | "signup";

interface AuthFormProps {
  mode?: AuthMode;
  onSuccess?: () => void;
  onToggleMode?: () => void;
}

const signInSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

const signUpSchema = signInSchema.extend({
  full_name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters" }),
});

const AuthForm = ({
  mode = "signin",
  onSuccess = () => {},
  onToggleMode = () => {},
}: AuthFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const schema = mode === "signin" ? signInSchema : signUpSchema;
  type FormValues = z.infer<typeof schema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
      ...(mode === "signup" ? { full_name: "" } : {}),
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);
    setError(null);

    try {
      if (mode === "signin") {
        await signIn(values);
      } else {
        await signUp(values);
      }
      onSuccess();
    } catch (err: any) {
      setError(err.message || "An error occurred during authentication");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {mode === "signup" && (
            <FormField
              control={form.control}
              name="full_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {error && (
            <div className="p-3 rounded-md bg-destructive/15 text-destructive text-sm">
              {error}
            </div>
          )}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {mode === "signin" ? "Signing in..." : "Signing up..."}
              </>
            ) : (
              <>{mode === "signin" ? "Sign In" : "Sign Up"}</>
            )}
          </Button>

          <div className="text-center text-sm">
            {mode === "signin" ? (
              <p>
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={onToggleMode}
                  className="text-primary hover:underline font-medium"
                >
                  Sign Up
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={onToggleMode}
                  className="text-primary hover:underline font-medium"
                >
                  Sign In
                </button>
              </p>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AuthForm;
