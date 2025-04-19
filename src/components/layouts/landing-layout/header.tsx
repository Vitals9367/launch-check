import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-gray-100 bg-white/95 py-4 backdrop-blur-sm">
      <div className="container mx-auto flex max-w-6xl items-center justify-between">
        <Link href="/" className="flex items-center">
          <Shield className="mr-2 h-6 w-6 text-red-600" />
          <h1 className="text-md font-bold md:text-xl">Launch Check</h1>
        </Link>
        <div className="flex items-center space-x-3">
          <Link href="/#waitlist">
            <Button
              size="sm"
              className="bg-red-600 text-white hover:bg-red-700"
            >
              Join the Waitlist
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
