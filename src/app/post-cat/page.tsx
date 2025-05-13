'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Loader2Icon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function PostCatPage() {
  const { user, isLoading: authIsLoading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (!authIsLoading && !user) {
      router.push('/login?redirect=/post-cat');
    }
  }, [user, authIsLoading, router]);

  if (authIsLoading || !user) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
        <Loader2Icon className="h-16 w-16 animate-spin text-primary" />
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic
    toast({
        title: "تم إرسال النموذج (مثال)",
        description: "سيتم مراجعة طلبك قريباً.",
    });
    // router.push('/profile'); // Optionally redirect
  };

  return (
    <div className="container mx-auto py-8">
      <Card className="max-w-2xl mx-auto shadow-xl">
        <CardHeader className="text-right">
          <CardTitle className="text-3xl font-bold text-primary">عرض قط للتبني</CardTitle>
          <CardDescription>شارك تفاصيل حول القط لإيجاد منزل محب جديد له.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="catName" className="font-semibold text-right block w-full">اسم القط</Label>
              <Input id="catName" placeholder="مثال: ويسكرز" required />
            </div>
            <div>
              <Label htmlFor="catAge" className="font-semibold text-right block w-full">العمر (سنوات)</Label>
              <Input id="catAge" type="number" placeholder="مثال: ٢" required />
            </div>
            <div>
              <Label htmlFor="catBreed" className="font-semibold text-right block w-full">السلالة</Label>
              <Input id="catBreed" placeholder="مثال: سيامي" required />
            </div>
            <div>
              <Label htmlFor="catStory" className="font-semibold text-right block w-full">القصة</Label>
              <Textarea id="catStory" placeholder="أخبرنا عن القط..." required rows={4} />
            </div>
            {/* Add more fields as per CatFormData: images, gender, health, behavior, location */}
            <div className="pt-4">
              <Button type="submit" className="w-full btn-primary">عرض القط</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

