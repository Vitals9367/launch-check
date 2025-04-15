import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import LogoutButton from "@/components/logout-button";
import DeleteAccountButton from "@/components/profile/delete-account-button";
import { LoadingScreen } from "@/components/loading/loading-screen";
import { auth } from "@/server/auth";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user) {
    return <LoadingScreen />;
  }

  const user = session.user;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
        <p className="text-gray-500">
          Manage your account settings and preferences
        </p>
      </div>
      <Card>
        <CardHeader className="space-y-4">
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={user.image || ""} alt={user.name || ""} />
              <AvatarFallback className="text-xl">
                {user.name
                  ?.split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle>{user.name}</CardTitle>
              <CardDescription>{user.email}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <Separator />
          <div className="space-y-2">
            <h3 className="mb-4 text-lg font-medium">Account Actions</h3>
            <div className="flex flex-col gap-4 sm:flex-row">
              <LogoutButton />
              <DeleteAccountButton />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
