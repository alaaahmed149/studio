'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // In a real app, you'd validate credentials. Here, we just "log in" the first mock user for demo.
    // Or, if you have specific mock users, you could try to find one by email.
    // For this example, let's assume any non-empty email/password with a mock user ID 'user1' works.
    // If your AuthContext's login needs a specific user ID from mockUsers:
    // const userToLogin = mockUsers.find(u => u.email === email);
    // if (userToLogin) { login(userToLogin.id); } else { login(mockUsers[0].id); }
    
    login('user1'); // Logs in as the first mock user.

    toast({
        title: "تم تسجيل الدخول بنجاح!",
        description: "مرحباً بعودتك!",
    });
    
    const redirectUrl = searchParams.get('redirect') || '/profile';
    router.push(redirectUrl);
    setIsLoading(false);
  };

  return (
    <div className="flex items-center justify-center py-12">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-primary">تسجيل الدخول</CardTitle>
          <CardDescription>أدخل بيانات الاعتماد الخاصة بك للوصول إلى حسابك.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-right block w-full">البريد الإلكتروني</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="you@example.com" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                dir="ltr" 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-right block w-full">كلمة المرور</Label>
              <Input 
                id="password" 
                type="password" 
                placeholder="••••••••" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                dir="ltr"
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button type="submit" className="w-full btn-primary" disabled={isLoading}>
              {isLoading ? 'جارٍ تسجيل الدخول...' : 'تسجيل الدخول'}
            </Button>
            <p className="text-sm text-muted-foreground">
              ليس لديك حساب؟{' '}
              <Link href="/signup" className="font-semibold text-primary hover:underline">
                إنشاء حساب
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

