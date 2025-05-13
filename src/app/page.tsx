import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { PawPrintIcon } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-12">
      <div className="mb-8">
        <Image 
          src="https://picsum.photos/seed/happycat/400/300" 
          alt="قط سعيد تم تبنيه" 
          width={400} 
          height={300}
          className="rounded-lg shadow-xl"
          data-ai-hint="happy cat"
        />
      </div>
      
      <h1 className="text-5xl font-extrabold tracking-tight text-primary mb-6 flex items-center gap-3">
        <PawPrintIcon className="h-12 w-12" />
        مرحباً بك في مواءمة مثالية!
        <PawPrintIcon className="h-12 w-12" />
      </h1>
      
      <p className="text-xl text-foreground/80 max-w-2xl mb-10 leading-relaxed">
        اكتشف قططًا محبة تنتظر بفارغ الصبر منازلها الدائمة. في مواءمة مثالية، نربط الأفراد المتعاطفين مثلك بالقطط الرائعة المحتاجة. ابدأ رحلتك للعثور على صديقك المفضل الجديد اليوم!
      </p>
      
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <Button size="lg" className="btn-primary text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-shadow" asChild>
          <Link href="/browse-cats">ابحث عن صديق</Link>
        </Button>
        <Button variant="outline" size="lg" className="text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-shadow" asChild>
          <Link href="/post-cat">إعادة توطين قط</Link>
        </Button>
      </div>

      <section className="mt-20 w-full max-w-4xl">
        <h2 className="text-3xl font-bold text-foreground mb-8">كيف يعمل</h2>
        <div className="grid md:grid-cols-3 gap-8 text-right">
          <div className="bg-card p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-semibold text-primary mb-2">١. تصفح القطط</h3>
            <p className="text-foreground/70">استكشف ملفات تعريف القطط المتاحة للتبني. قم بالتصفية حسب العمر والسلالة والموقع للعثور على تطابقك المثالي.</p>
          </div>
          <div className="bg-card p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-semibold text-primary mb-2">٢. تواصل وتبنى</h3>
            <p className="text-foreground/70">هل وجدت قطًا تحبه؟ قدم طلب تبني. سيقوم المالكون بمراجعته والتواصل معك.</p>
          </div>
          <div className="bg-card p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-semibold text-primary mb-2">٣. إعادة التوطين بعناية</h3>
            <p className="text-foreground/70">هل تحتاج إلى إيجاد منزل جديد لقطتك؟ أنشئ ملفًا شخصيًا وتواصل مع المتبنين المحبين بأمان.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

