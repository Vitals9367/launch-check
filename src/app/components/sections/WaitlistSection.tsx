"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, Shield } from "lucide-react";
import { joinWaitlist } from "@/app/actions/waitlist";
import { useToast } from "@/app/hooks/use-toast";
import { z } from "zod";
import { api } from "@/trpc/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const waitlistSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
});

export function WaitlistSection() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: waitlistEntries } = api.waitlist.fetch.useQuery();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<z.infer<typeof waitlistSchema>>({
    resolver: zodResolver(waitlistSchema),
  });

  async function handleWaitlistSubmission({
    name,
    email,
  }: z.infer<typeof waitlistSchema>) {
    setIsSubmitting(true);
    try {
      const result = await joinWaitlist({ name, email });

      if (result.success) {
        toast({
          title: "Success!",
          description: result.message,
          variant: "default",
        });

        reset();
      } else {
        toast({
          title: "Error",
          description: "An unexpected error occurred. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section
      id="waitlist"
      className="bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 px-4 py-20"
    >
      <div className="container mx-auto max-w-6xl">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div className="space-y-6">
            <div className="inline-flex items-center rounded-full bg-red-100 px-3 py-1 text-sm text-red-700">
              <Shield className="mr-1 h-3.5 w-3.5" />
              <span>Early Access</span>
            </div>
            <h2 className="text-3xl font-bold md:text-4xl">
              Join the Indie Hackers Security Movement
            </h2>
            <p className="text-xl text-gray-600">
              Be part of making security accessible for indie hackers everywhere
            </p>

            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center">
                <div className="mr-2 h-2 w-2 rounded-full bg-yellow-500"></div>
                <span className="font-medium">Limited spots available</span>
              </div>
              <div className="flex items-center">
                <div className="mr-2 h-2 w-2 rounded-full bg-green-500"></div>
                <span className="font-medium">
                  {waitlistEntries?.length}+ people on the waitlist
                </span>
              </div>
            </div>

            <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
              <h3 className="mb-4 font-semibold">Reserve Your Spot</h3>
              <form
                id="waitlist-form"
                onSubmit={handleSubmit(handleWaitlistSubmission)}
                className="space-y-4"
              >
                <div>
                  <label
                    htmlFor="name"
                    className="mb-1 block text-sm font-medium text-gray-700"
                  >
                    Name
                  </label>
                  <Input
                    placeholder="Your name"
                    required
                    disabled={isSubmitting}
                    className="w-full"
                    {...register("name")}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="mb-1 block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    required
                    disabled={isSubmitting}
                    className="w-full"
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <Button
                  className="w-full bg-red-600 hover:bg-red-700"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="mr-2 h-4 w-4 animate-spin"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Joining...
                    </>
                  ) : (
                    "Join the Waitlist"
                  )}
                </Button>
              </form>
            </div>
          </div>

          <div className="space-y-6 md:pl-8">
            <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
              <h3 className="mb-4 font-semibold">What You'll Get</h3>
              <ul className="space-y-4">
                <li className="flex">
                  <div className="mr-3 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-green-100">
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium">Early Access</p>
                    <p className="text-sm text-gray-600">
                      Be the first to try the security scanner built for indie
                      hackers
                    </p>
                  </div>
                </li>
                <li className="flex">
                  <div className="mr-3 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-green-100">
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium">Indie Hacker Pricing</p>
                    <p className="text-sm text-gray-600">
                      Lock in special early supporter pricing forever
                    </p>
                  </div>
                </li>
                <li className="flex">
                  <div className="mr-3 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-green-100">
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium">Direct Access</p>
                    <p className="text-sm text-gray-600">
                      Shape the product with direct feedback to me
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center">
                <div className="mr-4 flex -space-x-2">
                  <div className="h-8 w-8 rounded-full border-2 border-white bg-gray-200"></div>
                  <div className="h-8 w-8 rounded-full border-2 border-white bg-gray-300"></div>
                  <div className="h-8 w-8 rounded-full border-2 border-white bg-gray-400"></div>
                </div>
                <div className="text-sm">
                  <p className="font-medium">Joined this week</p>
                  <p className="text-gray-500">
                    From Reddit, Indie Hackers, Product Hunt, and X
                  </p>
                </div>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex items-center">
                  <div className="h- mr-2 w-2 rounded-full bg-red-500"></div>
                  <span>
                    "I've been greeted by email as "null", been locked out of an
                    account without a forgot password feature and found poorly
                    styled dashboards meaning I can't see what it is I signed up
                    to do."
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
