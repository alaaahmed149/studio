'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2Icon, Edit3Icon } from 'lucide-react';

export default function ProfilePage() {
  const { user, isLoading: authIsLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authIsLoading && !user) {
      router.push('/login?redirect=/profile');
    }
  }, [user, authIsLoading, router]);

  if (authIsLoading || !user) {
    return (
       <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
        <Loader2Icon className="h-16 w-16 animate-spin text-primary" />
      </div>
    );
  }
  
  const getInitials = (name: string) => {
    const names = name.split(' ');
    if (names.length === 1) return names[0].charAt(0).toUpperCase();
    return names[0].charAt(0).toUpperCase() + names[names.length - 1].charAt(0).toUpperCase();
  };


  return (
    <div className="container mx-auto py-8">
      <Card className="mb-8 shadow-lg">
        <CardHeader className="flex flex-col items-center text-center sm:flex-row sm:text-left sm:items-start gap-6 p-6">
          <Avatar className="h-24 w-24 border-4 border-primary shadow-md">
            <AvatarImage src={user.avatarUrl} alt={user.name} data-ai-hint="user avatar" />
            <AvatarFallback className="text-3xl bg-muted text-muted-foreground">
              {getInitials(user.name)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-grow">
            <CardTitle className="text-3xl font-bold text-primary mb-1">{user.name}</CardTitle>
            <CardDescription className="text-lg text-muted-foreground">{user.email}</CardDescription>
            <Button variant="outline" size="sm" className="mt-3">
              <Edit3Icon className="h-4 w-4 mr-2" /> Edit Profile
            </Button>
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue="my-cats" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-6">
          <TabsTrigger value="my-info">My Info</TabsTrigger>
          <TabsTrigger value="my-cats">My Posted Cats</TabsTrigger>
          <TabsTrigger value="sent-requests">Sent Requests</TabsTrigger>
          <TabsTrigger value="received-requests">Received Requests</TabsTrigger>
        </TabsList>
        
        <TabsContent value="my-info">
          <Card>
            <CardHeader>
              <CardTitle>My Information</CardTitle>
              <CardDescription>View and edit your personal details.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              {/* Placeholder for edit form */}
              <Button variant="outline"><Edit3Icon className="h-4 w-4 mr-2" />Edit Information (Placeholder)</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="my-cats">
          <Card>
            <CardHeader>
              <CardTitle>My Posted Cats</CardTitle>
              <CardDescription>Manage cats you've listed for adoption.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">You haven't posted any cats yet.</p>
              {/* List user's cats here */}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sent-requests">
          <Card>
            <CardHeader>
              <CardTitle>Adoption Requests Sent</CardTitle>
              <CardDescription>Track the status of your adoption applications.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">You haven't sent any adoption requests yet.</p>
              {/* List sent requests here */}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="received-requests">
          <Card>
            <CardHeader>
              <CardTitle>Adoption Requests Received</CardTitle>
              <CardDescription>Manage adoption requests for your cats.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">No adoption requests received for your cats.</p>
              {/* List received requests here with Accept/Reject options */}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
