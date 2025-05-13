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
          alt="Happy adopted cat" 
          width={400} 
          height={300}
          className="rounded-lg shadow-xl"
          data-ai-hint="happy cat"
        />
      </div>
      
      <h1 className="text-5xl font-extrabold tracking-tight text-primary mb-6 flex items-center gap-3">
        <PawPrintIcon className="h-12 w-12" />
        Welcome to PurrfectMatch!
        <PawPrintIcon className="h-12 w-12" />
      </h1>
      
      <p className="text-xl text-foreground/80 max-w-2xl mb-10 leading-relaxed">
        Discover loving cats eagerly awaiting their forever homes. At PurrfectMatch, we connect compassionate individuals like you with adorable felines in need. Start your journey to find your new best friend today!
      </p>
      
      <div className="space-x-4">
        <Button size="lg" className="btn-primary text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-shadow" asChild>
          <Link href="/browse-cats">Find a Friend</Link>
        </Button>
        <Button variant="outline" size="lg" className="text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-shadow" asChild>
          <Link href="/post-cat">Rehome a Cat</Link>
        </Button>
      </div>

      <section className="mt-20 w-full max-w-4xl">
        <h2 className="text-3xl font-bold text-foreground mb-8">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8 text-left">
          <div className="bg-card p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-semibold text-primary mb-2">1. Browse Cats</h3>
            <p className="text-foreground/70">Explore profiles of cats available for adoption. Filter by age, breed, and location to find your purrfect match.</p>
          </div>
          <div className="bg-card p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-semibold text-primary mb-2">2. Connect & Adopt</h3>
            <p className="text-foreground/70">Found a cat you love? Submit an adoption request. Owners will review and connect with you.</p>
          </div>
          <div className="bg-card p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-semibold text-primary mb-2">3. Rehome with Care</h3>
            <p className="text-foreground/70">Need to find a new home for your cat? Create a profile and connect with loving adopters safely.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
