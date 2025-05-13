'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button'; // Placeholder for form elements
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Loader2Icon } from 'lucide-react';

export default function PostCatPage() {
  const { user, isLoading: authIsLoading } = useAuth();
  const router = useRouter();

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

  // Basic form structure placeholder
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic
    alert('Form submitted (placeholder)');
  };

  return (
    <div className="container mx-auto py-8">
      <Card className="max-w-2xl mx-auto shadow-xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-primary">Post a Cat for Adoption</CardTitle>
          <CardDescription>Share details about the cat to find them a loving new home.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="catName" className="font-semibold">Cat's Name</Label>
              <Input id="catName" placeholder="e.g., Whiskers" required />
            </div>
            <div>
              <Label htmlFor="catAge" className="font-semibold">Age (years)</Label>
              <Input id="catAge" type="number" placeholder="e.g., 2" required />
            </div>
            <div>
              <Label htmlFor="catBreed" className="font-semibold">Breed</Label>
              <Input id="catBreed" placeholder="e.g., Siamese" required />
            </div>
            <div>
              <Label htmlFor="catStory" className="font-semibold">Story</Label>
              <Textarea id="catStory" placeholder="Tell us about the cat..." required rows={4} />
            </div>
            {/* Add more fields as per CatFormData: images, gender, health, behavior, location */}
            <div className="pt-4">
              <Button type="submit" className="w-full btn-primary">Post Cat</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
