/* eslint-disable @typescript-eslint/no-explicit-any */
// app/[locale]/profile/page.tsx
"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import PersonalInfo from "@/components/profile/PersonalInfo";
import AddressesManager from "@/components/profile/AddressesManager";
import SecuritySettings from "@/components/profile/SecuritySettings";
import { User, MapPin, Shield, Bell } from "lucide-react";
import PreferencesSettings from "@/components/profile/PreferencesSettings";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [userData, setUserData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   if (status === 'unauthenticated') {
  //     router.push('/auth/login');
  //   }
  // }, [status, router]);

  useEffect(() => {
    if (session?.user?.id) {
      fetchUserData();
    }
  }, [session]);

  const fetchUserData = async () => {
    try {
      const response = await fetch("/api/user/profile");
      const data = await response.json();
      setUserData(data.user);
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // if (status === 'loading' || isLoading) {
  //   return (
  //     <div className="container max-w-5xl py-10">
  //       <Skeleton className="h-12 w-64 mb-8" />
  //       <div className="space-y-4">
  //         <Skeleton className="h-32 w-full" />
  //         <Skeleton className="h-32 w-full" />
  //         <Skeleton className="h-32 w-full" />
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="container max-w-5xl py-10 mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">My Account</h1>
        <p className="text-muted-foreground mt-2">
          Manage your account settings and preferences
        </p>
      </div>

      <Tabs defaultValue="personal" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
          <TabsTrigger value="personal" className="gap-2">
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">Personal Info</span>
          </TabsTrigger>
          <TabsTrigger value="addresses" className="gap-2">
            <MapPin className="h-4 w-4" />
            <span className="hidden sm:inline">Addresses</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="gap-2">
            <Shield className="h-4 w-4" />
            <span className="hidden sm:inline">Security</span>
          </TabsTrigger>
          <TabsTrigger value="preferences" className="gap-2">
            <Bell className="h-4 w-4" />
            <span className="hidden sm:inline">Preferences</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="personal">
          <PersonalInfo user={userData} onUpdate={fetchUserData} />
        </TabsContent>

        <TabsContent value="addresses">
          <AddressesManager userId={session?.user?.id} />
        </TabsContent>

        <TabsContent value="security">
          <SecuritySettings user={userData} />
        </TabsContent>

        <TabsContent value="preferences">
          <PreferencesSettings user={userData} onUpdate={fetchUserData} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
// <Card>
//           <CardHeader>
//             <CardTitle>Preferences</CardTitle>
//             <CardDescription>Manage your notification and display preferences</CardDescription>
//           </CardHeader>
//           <CardContent>
//             {/* Preferences content */}
//           </CardContent>
//         </Card>
