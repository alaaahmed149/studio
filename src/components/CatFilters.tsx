'use client';

import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FilterIcon, XIcon } from 'lucide-react';

interface CatFiltersProps {
  onFilterChange: (filters: { age?: string; breed?: string; gender?: string; location?: string }) => void;
  breeds: string[]; // Pass unique breeds from data
}

const CatFilters = ({ onFilterChange, breeds }: CatFiltersProps) => {
  const [age, setAge] = useState('');
  const [breed, setBreed] = useState('');
  const [gender, setGender] = useState('');
  const [location, setLocation] = useState('');

  useEffect(() => {
    // Debounce filter changes or apply immediately
    const filters = {
      age: age || undefined,
      breed: breed || undefined,
      gender: gender || undefined,
      location: location || undefined,
    };
    onFilterChange(filters);
  }, [age, breed, gender, location, onFilterChange]);

  const clearFilters = () => {
    setAge('');
    setBreed('');
    setGender('');
    setLocation('');
  };

  const uniqueBreeds = Array.from(new Set(breeds)); // Ensure breeds are unique

  return (
    <Card className="mb-8 shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <FilterIcon className="h-5 w-5 text-primary" />
          Filter Cats
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Input
            type="number"
            placeholder="Age (years)"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            min="0"
            className="text-base md:text-sm"
          />
          <Select value={breed} onValueChange={setBreed}>
            <SelectTrigger className="text-base md:text-sm">
              <SelectValue placeholder="Breed" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Any Breed</SelectItem>
              {uniqueBreeds.map((b) => (
                <SelectItem key={b} value={b}>{b}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={gender} onValueChange={setGender}>
            <SelectTrigger className="text-base md:text-sm">
              <SelectValue placeholder="Gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Any Gender</SelectItem>
              <SelectItem value="Male">Male</SelectItem>
              <SelectItem value="Female">Female</SelectItem>
              <SelectItem value="Unknown">Unknown</SelectItem>
            </SelectContent>
          </Select>
          <Input
            placeholder="Location (e.g., City, State)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="text-base md:text-sm"
          />
        </div>
        <div className="mt-4 flex justify-end">
          <Button variant="outline" onClick={clearFilters} className="flex items-center gap-1">
            <XIcon className="h-4 w-4" /> Clear Filters
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CatFilters;
