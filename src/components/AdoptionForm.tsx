'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useState, type FormEvent } from 'react';
import type { Cat, AdoptionRequestFormData } from '@/types';
import { useToast } from "@/hooks/use-toast";
// import { submitAdoptionRequest } from '@/lib/actions'; // Placeholder for server action

interface AdoptionFormProps {
  cat: Cat;
  children: React.ReactNode; // For the trigger button
}

const predefinedQuestions = [
  "لماذا تريد تبني هذا القط؟",
  "صف بيئة منزلك (مثال: منزل/شقة، حيوانات أليفة أخرى، أطفال):",
  "ما هي خبرتك مع القطط؟"
];

export function AdoptionForm({ cat, children }: AdoptionFormProps) {
  const { user } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [answers, setAnswers] = useState<string[]>(Array(predefinedQuestions.length).fill(''));

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!user) {
      router.push('/login?redirect=/cats/' + cat.id);
      return;
    }
    setIsLoading(true);

    const formData: AdoptionRequestFormData = {
      message: predefinedQuestions.map((q, i) => `${q}\nالإجابة: ${answers[i] || 'لم تتم الإجابة'}`).join('\n\n'),
    };

    try {
      // Placeholder for actual submission logic, e.g., server action
      // await submitAdoptionRequest({ catId: cat.id, requesterId: user.id, ownerId: cat.postedBy, message: formData.message });
      console.log('Adoption request submitted:', { catId: cat.id, userId: user.id, ownerId: cat.postedBy, formData });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      toast({
        title: "تم إرسال الطلب!",
        description: `تم إرسال طلب التبني الخاص بك لـ ${cat.name}.`,
        variant: "default",
      });
      setIsOpen(false); // Close dialog on success
      setAnswers(Array(predefinedQuestions.length).fill('')); // Reset form
    } catch (error) {
      console.error("Failed to submit adoption request:", error);
      toast({
        title: "خطأ",
        description: "تعذر إرسال طلب التبني الخاص بك. يرجى المحاولة مرة أخرى.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenChange = (open: boolean) => {
    if (!user && open) {
        router.push('/login?redirect=/cats/' + cat.id);
        return;
    }
    setIsOpen(open);
    if (!open) { // Reset form when dialog is closed
      setAnswers(Array(predefinedQuestions.length).fill(''));
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px] bg-card shadow-xl rounded-lg text-right">
        <DialogHeader>
          <DialogTitle className="text-2xl text-primary">تبني {cat.name}</DialogTitle>
          <DialogDescription>
            يرجى الإجابة على بعض الأسئلة لمساعدة مالك {cat.name} على معرفة المزيد عنك.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 py-4">
            {predefinedQuestions.map((question, index) => (
              <div className="grid grid-cols-1 items-center gap-2" key={index}>
                <Label htmlFor={`question-${index}`} className="text-right font-semibold">
                  {question}
                </Label>
                <Textarea
                  id={`question-${index}`}
                  value={answers[index]}
                  onChange={(e) => handleAnswerChange(index, e.target.value)}
                  className="col-span-3 min-h-[80px]"
                  required
                  disabled={isLoading}
                />
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button type="submit" className="btn-primary" disabled={isLoading}>
              {isLoading ? 'جارٍ الإرسال...' : 'إرسال الطلب'}
            </Button>
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)} disabled={isLoading}>
              إلغاء
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

