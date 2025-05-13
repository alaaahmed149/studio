'use client';

import Link from 'next/link';
import { CatIcon, HomeIcon, SearchIcon } from 'lucide-react'; // Using SearchIcon for Browse Cats
import { Button } from '@/components/ui/button';
import UserNav from '@/components/auth/UserNav';
import { useAuth } from '@/contexts/AuthContext';

const Header = () => {
  const { user, isLoading } = useAuth();

  return (
    <header className="bg-card border-b border-border shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
          <CatIcon className="h-8 w-8" />
          <span className="text-2xl font-bold">PurrfectMatch</span>
        </Link>
        
        <nav className="flex items-center gap-4 md:gap-6">
          <Link href="/" className="text-foreground/80 hover:text-primary transition-colors flex items-center gap-1">
            <HomeIcon className="h-5 w-5" />
            Home
          </Link>
          <Link href="/browse-cats" className="text-foreground/80 hover:text-primary transition-colors flex items-center gap-1">
            <SearchIcon className="h-5 w-5" />
            Browse Cats
          </Link>
          
          {isLoading ? (
            <div className="h-10 w-24 bg-muted rounded-md animate-pulse"></div>
          ) : user ? (
            <UserNav user={user} />
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="outline" asChild>
                <Link href="/login">Sign In</Link>
              </Button>
              <Button variant="default" className="btn-primary" asChild>
                <Link href="/signup">Sign Up</Link>
              </Button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
