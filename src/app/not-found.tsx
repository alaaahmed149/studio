import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AlertTriangleIcon } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20">
      <AlertTriangleIcon className="w-24 h-24 text-destructive mb-6" />
      <h1 className="text-5xl font-extrabold text-primary mb-4">٤٠٤ - الصفحة غير موجودة</h1>
      <p className="text-xl text-foreground/80 max-w-md mb-8">
        عفوًا! الصفحة التي تبحث عنها غير موجودة أو تم نقلها.
      </p>
      <Button asChild size="lg" className="btn-primary">
        <Link href="/">العودة إلى الصفحة الرئيسية</Link>
      </Button>
    </div>
  );
}

