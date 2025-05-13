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
        <CardHeader className="flex flex-col items-center text-center sm:flex-row sm:text-right sm:items-start gap-6 p-6">
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
              تعديل الملف الشخصي <Edit3Icon className="h-4 w-4 ms-2" />
            </Button>
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue="my-cats" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-6">
          <TabsTrigger value="my-info">معلوماتي</TabsTrigger>
          <TabsTrigger value="my-cats">قططي المعروضة</TabsTrigger>
          <TabsTrigger value="sent-requests">الطلبات المرسلة</TabsTrigger>
          <TabsTrigger value="received-requests">الطلبات المستلمة</TabsTrigger>
        </TabsList>
        
        <TabsContent value="my-info">
          <Card>
            <CardHeader>
              <CardTitle>معلوماتي الشخصية</CardTitle>
              <CardDescription>عرض وتعديل تفاصيلك الشخصية.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-right">
              <p><strong>الاسم:</strong> {user.name}</p>
              <p><strong>البريد الإلكتروني:</strong> {user.email}</p>
              {/* Placeholder for edit form */}
              <Button variant="outline">تعديل المعلومات (مثال) <Edit3Icon className="h-4 w-4 ms-2" /></Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="my-cats">
          <Card>
            <CardHeader className="text-right">
              <CardTitle>قططي المعروضة للتبني</CardTitle>
              <CardDescription>إدارة القطط التي عرضتها للتبني.</CardDescription>
            </CardHeader>
            <CardContent className="text-right">
              <p className="text-muted-foreground">لم تقم بعرض أي قطط بعد.</p>
              {/* List user's cats here */}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sent-requests">
          <Card>
            <CardHeader className="text-right">
              <CardTitle>طلبات التبني المرسلة</CardTitle>
              <CardDescription>تتبع حالة طلبات التبني الخاصة بك.</CardDescription>
            </CardHeader>
            <CardContent className="text-right">
              <p className="text-muted-foreground">لم تقم بإرسال أي طلبات تبني بعد.</p>
              {/* List sent requests here */}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="received-requests">
          <Card>
            <CardHeader className="text-right">
              <CardTitle>طلبات التبني المستلمة</CardTitle>
              <CardDescription>إدارة طلبات التبني لقططك.</CardDescription>
            </CardHeader>
            <CardContent className="text-right">
              <p className="text-muted-foreground">لم يتم استلام أي طلبات تبني لقططك.</p>
              {/* List received requests here with Accept/Reject options */}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

