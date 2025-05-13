
'use client'; 

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import CatCard from '@/components/CatCard';
import CatFilters from '@/components/CatFilters';
import { getCats, mockCats as staticMockCats } from '@/lib/data'; 
import type { Cat } from '@/types';
import { Loader2Icon, FrownIcon } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardFooter } from "@/components/ui/card";


const BrowseCatsPage = () => {
  const [cats, setCats] = useState<Cat[]>([]);
  const [filteredCats, setFilteredCats] = useState<Cat[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState<{ age?: string; breed?: string; gender?: string; location?: string }>({});

  const uniqueBreeds = useMemo(() => {
    return Array.from(new Set(staticMockCats.map(cat => cat.breed))).sort();
  }, []);

  useEffect(() => {
    const fetchAndSetCats = async () => {
      setIsLoading(true);
      try {
        const allCats = await getCats(); 
        setCats(allCats);
        setFilteredCats(allCats); 
      } catch (error) {
        console.error("Failed to fetch cats:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAndSetCats();
  }, []);

  useEffect(() => {
    let currentCats = [...cats];
    if (filters.age) {
      currentCats = currentCats.filter(cat => cat.age === parseInt(filters.age!, 10));
    }
    if (filters.breed) {
      currentCats = currentCats.filter(cat => cat.breed === filters.breed);
    }
    if (filters.gender) {
      currentCats = currentCats.filter(cat => cat.gender === filters.gender);
    }
    if (filters.location) {
      currentCats = currentCats.filter(cat => cat.location.toLowerCase().includes(filters.location!.toLowerCase()));
    }
    setFilteredCats(currentCats);
  }, [filters, cats]);


  const handleFilterChange = useCallback((newFilters: { age?: string; breed?: string; gender?: string; location?: string }) => {
    setFilters(newFilters);
  }, []); 

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold text-primary mb-8 text-center">اعثر على رفيقك المثالي</h1>
      
      <CatFilters onFilterChange={handleFilterChange} breeds={uniqueBreeds} />

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <Card className="overflow-hidden shadow-lg flex flex-col h-full" key={index}>
              <Skeleton className="w-full h-56" />
              <CardContent className="p-4 flex-grow text-right">
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2 mb-1" />
                <Skeleton className="h-4 w-1/2 mb-1" />
                <Skeleton className="h-4 w-1/2 mb-3" />
                <Skeleton className="h-12 w-full" />
              </CardContent>
              <CardFooter className="p-4 border-t">
                <Skeleton className="h-10 w-full" />
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : filteredCats.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCats.map((cat) => (
            <CatCard key={cat.id} cat={cat} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <FrownIcon className="h-24 w-24 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-foreground mb-2">لم يتم العثور على قطط</h2>
          <p className="text-muted-foreground">حاول تعديل عوامل التصفية أو تحقق مرة أخرى لاحقًا للوافدين الجدد!</p>
        </div>
      )}
    </div>
  );
};

export default BrowseCatsPage;

