"use client";

import React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

const LogoutButton = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = () => {
    setIsLoading(true);
    signOut();
  };
  return (
    <Button
      variant="outline"
      className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
      onClick={handleLogout}
      disabled={isLoading}
    >
      <LogOut className="mr-2 h-4 w-4" />
      {isLoading ? "Logging out..." : "Log Out"}
    </Button>
  );
};

export default LogoutButton;
