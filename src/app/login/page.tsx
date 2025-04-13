"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { LoadingScreen } from "@/components/loading-screen";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { signIn } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";

const providers = [
  {
    id: "github",
    name: "GitHub",
    icon: <FaGithub className="mr-2 h-5 w-5" />,
  },
  {
    id: "google",
    name: "Google",
    icon: <FaGoogle className="mr-2 h-5 w-5" />,
  },
];

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const handleSignIn = async (providerId: string) => {
    try {
      setIsLoading(true);
      const result = await signIn(providerId);

      if (result?.error) {
        toast({
          variant: "destructive",
          title: "Authentication failed",
          description: "There was a problem signing in with " + providerId,
        });
        setIsLoading(false);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
      });
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <LoadingScreen message="Signing you in..." />}
      <main className="flex h-screen flex-1 items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Card className="border-gray-200 shadow-sm">
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-2xl font-bold">
                Sign in to Launch Check
              </CardTitle>
              <CardDescription>
                Continue with your preferred social account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                {providers.map((provider) => (
                  <Button
                    key={provider.id}
                    variant="outline"
                    className="h-11 border-gray-300"
                    disabled={isLoading}
                    onClick={() => handleSignIn(provider.id)}
                  >
                    {provider.icon}
                    Continue with {provider.name}
                  </Button>
                ))}
              </div>
            </CardContent>
            {/* <CardFooter className="flex flex-col space-y-4">
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link
                  href="/signup"
                  className="font-medium text-red-600 hover:text-red-700"
                >
                  Sign up
                </Link>
              </div>
              <div className="text-center text-xs text-gray-500">
                By signing in, you agree to our{" "}
                <Link href="/terms" className="underline hover:text-gray-800">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="underline hover:text-gray-800">
                  Privacy Policy
                </Link>
              </div>
            </CardFooter> */}
          </Card>
        </div>
      </main>
    </>
  );
}
