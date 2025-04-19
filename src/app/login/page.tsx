"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { LoadingScreen } from "@/components/loading/loading-screen";
import { motion } from "framer-motion";
import { Shield } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { signIn } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";
import { callbackUrlQueryParam, DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { useQueryState } from "nuqs";

const providers = [
  {
    id: "github",
    name: "GitHub",
    icon: <FaGithub className="h-5 w-5" />,
  },
  {
    id: "google",
    name: "Google",
    icon: <FaGoogle className="h-5 w-5" />,
  },
];

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [callbackUrl, setCallbackUrl] = useQueryState(callbackUrlQueryParam);
  const { toast } = useToast();

  const handleSignIn = async (providerId: string) => {
    try {
      setIsLoading(true);
      const result = await signIn(providerId, {
        redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
      });

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
      <main className="flex min-h-screen flex-col bg-gray-50">
        <div className="flex flex-1 flex-col items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md space-y-6"
          >
            {/* Logo and Brand */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="flex flex-col items-center space-y-2"
            >
              <div className="flex items-center justify-center rounded-lg bg-white p-3 shadow-sm">
                <Shield className="h-8 w-8 text-red-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Launch Check</h1>
            </motion.div>

            <Card className="border-gray-200 bg-white/80 shadow-sm">
              <CardHeader className="space-y-1 text-center">
                <CardTitle className="text-xl font-semibold text-gray-900">
                  Welcome
                </CardTitle>
                <CardDescription className="text-gray-500">
                  Sign in to continue to Launch Check
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 pt-2">
                <div className="grid gap-3">
                  {providers.map((provider, index) => (
                    <motion.div
                      key={provider.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                    >
                      <Button
                        variant="outline"
                        className="h-10 w-full border-gray-200 bg-white font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-50"
                        disabled={isLoading}
                        onClick={() => handleSignIn(provider.id)}
                      >
                        <span className="mr-2">{provider.icon}</span>
                        Continue with {provider.name}
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </>
  );
}
