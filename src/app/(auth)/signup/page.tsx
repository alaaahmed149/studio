'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

export default function SignupPage() {
  const { login } = useAuth(); // Using login to simulate successful signup and auto-login
  const router = useRouter();
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    // Simulate API call for signup
    await new Promise(resolve => setTimeout(resolve, 1000));

    // In a real app, you'd create a new user. Here, we simulate by "logging in" a mock user.
    // You could add the new user to mockUsers if you implement dynamic mock data updates.
    // For simplicity, we'll log in as 'user2' to differentiate from the login page's default.
    login('user2'); 

    toast({
        title: "تم إنشاء الحساب!",
        description: "مرحباً بك في مواءمة مثالية!",
    });
    
    router.push('/profile'); // Redirect to profile after signup
    setIsLoading(false);
  };

  return (
    <div className="flex items-center justify-center py-12">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-primary">إنشاء حساب</CardTitle>
          <CardDescription>انضم إلى مواءمة مثالية للعثور على قط أو إعادة توطينه.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-right block w-full">الاسم الكامل</Label>
              <Input 
                id="name" 
                placeholder="اسمك" 
                required 
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isLoading}
              />
            </div>
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
                placeholder="اختر كلمة مرور قوية" 
                required 
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                dir="ltr"
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button type="submit" className="w-full btn-primary" disabled={isLoading}>
              {isLoading ? 'جارٍ إنشاء الحساب...' : 'إنشاء حساب'}
            </Button>
            <p className="text-sm text-muted-foreground">
              هل لديك حساب بالفعل؟{' '}
              <Link href="/login" className="font-semibold text-primary hover:underline">
                تسجيل الدخول
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

