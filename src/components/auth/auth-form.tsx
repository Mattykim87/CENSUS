"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getErrorMessage } from "@/lib/handle-error";
import { useState } from "react";
import { toast } from "sonner";
import { useAuth } from "./auth-provider";

export function AuthForm() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { signIn, signUp, user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please enter email and password");
      return;
    }

    setIsLoading(true);

    try {
      const { error } = isSignUp
        ? await signUp(email, password)
        : await signIn(email, password);

      if (error) {
        toast.error(error.message);
      } else {
        toast.success(
          isSignUp ? "Account created successfully" : "Signed in successfully",
        );
        setEmail("");
        setPassword("");
      }
    } catch (error: unknown) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  if (user) {
    return (
      <div className="rounded-lg border p-4 shadow-sm">
        <h2 className="mb-4 font-semibold text-xl">Welcome, {user.email}</h2>
        <p className="mb-4 text-muted-foreground text-sm">
          You are currently signed in.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border p-4 shadow-sm">
      <h2 className="mb-4 font-semibold text-xl">
        {isSignUp ? "Create an Account" : "Sign In"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            disabled={isLoading}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            disabled={isLoading}
            required
          />
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Processing..." : isSignUp ? "Sign Up" : "Sign In"}
        </Button>
      </form>

      <div className="mt-4 text-center text-sm">
        <Button
          variant="link"
          onClick={() => setIsSignUp(!isSignUp)}
          className="p-0 text-sm"
        >
          {isSignUp
            ? "Already have an account? Sign In"
            : "Don't have an account? Sign Up"}
        </Button>
      </div>
    </div>
  );
}
