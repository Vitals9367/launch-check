"use client";

import { User, ChevronDown } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LogoutButton from "../../logout-button";
import { useCurrentUser } from "@/hooks/use-current-user";

type UserDropdownItemProps = {
  href: string;
  icon: React.ElementType;
  label: string;
};

const UserDropdownItem = ({
  href,
  icon: Icon,
  label,
}: UserDropdownItemProps) => (
  <DropdownMenuItem asChild>
    <Link href={href} className="flex w-full items-center">
      <Icon className="mr-2 h-4 w-4" />
      {label}
    </Link>
  </DropdownMenuItem>
);

const userMenuItems: UserDropdownItemProps[] = [
  {
    href: "/dashboard/profile",
    icon: User,
    label: "Profile",
  },
];

export function UserButton() {
  const user = useCurrentUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center space-x-2 rounded-lg bg-white px-3 py-2 hover:bg-gray-50">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user?.image || ""} alt={user?.name || "User"} />
            <AvatarFallback>{user?.name?.[0] || "U"}</AvatarFallback>
          </Avatar>
          <div className="hidden flex-col items-start text-sm md:flex">
            <span className="font-medium">{user?.name || "User"}</span>
            <span className="text-xs text-gray-500">{user?.email}</span>
          </div>
          <ChevronDown size={16} className="ml-2 text-gray-600" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {userMenuItems.map((item) => (
          <UserDropdownItem key={item.href} {...item} />
        ))}
        <DropdownMenuSeparator />
        <LogoutButton />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
