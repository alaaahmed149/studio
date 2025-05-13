import * as React from 'react';
import Image from 'next/image';
import { getCatById, getUserById } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { AdoptionForm } from '@/components/AdoptionForm';
import { HeartIcon, CalendarIcon, StethoscopeIcon, SmileIcon, MapPinIcon, UserCircleIcon, TagIcon } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  // In a real app, you'd fetch all cat IDs to pre-render.
  // For mock data, we might not need this or could use a limited set.
  // For now, this won't pre-render any specific paths.
  return []; 
}

interface CatProfilePageProps {
  params: { id: string };
}

export default async function CatProfilePage({ params }: CatProfilePageProps) {
  const cat = await getCatById(params.id);

  if (!cat) {
    notFound();
  }

  const owner = await getUserById(cat.postedBy);

  return (
    <div className="container mx-auto py-8">
      <div className="grid md:grid-cols-2 gap-8 items-start">
        {/* Image Gallery */}
        <div className="space-y-4">
          <Image
            src={cat.images[0]}
            alt={`Main image of ${cat.name}`}
            width={700}
            height={500}
            className="w-full h-auto object-cover rounded-lg shadow-xl border-2 border-primary/50"
            priority // Prioritize loading the main image
            data-ai-hint="cat image"
          />
          {cat.images.length > 1 && (
            <div className="grid grid-cols-3 gap-2">
              {cat.images.slice(1, 4).map((img, index) => ( // Show up to 3 additional thumbnails
                <Image
                  key={index}
                  src={img}
                  alt={`${cat.name} thumbnail ${index + 1}`}
                  width={200}
                  height={150}
                  className="w-full h-32 object-cover rounded-md shadow-md hover:opacity-80 transition-opacity"
                  data-ai-hint="cat image thumbnail"
                />
              ))}
            </div>
          )}
        </div>

        {/* Cat Details */}
        <Card className="shadow-xl">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-4xl font-extrabold text-primary">{cat.name}</CardTitle>
              <Badge variant={cat.adoptionStatus === 'adopted' ? 'destructive' : (cat.adoptionStatus === 'pending' ? 'secondary' : 'default')} className="text-sm px-3 py-1 capitalize">
                {cat.adoptionStatus}
              </Badge>
            </div>
            <CardDescription className="text-lg text-muted-foreground">{cat.breed}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <InfoItem icon={<CalendarIcon />} label="Age" value={`${cat.age} year${cat.age !== 1 ? 's' : ''} old`} />
              <InfoItem icon={<TagIcon />} label="Gender" value={cat.gender} />
              <InfoItem icon={<MapPinIcon />} label="Location" value={cat.location} />
              {owner && (
                <InfoItem icon={<UserCircleIcon />} label="Posted by" value={owner.name} />
              )}
            </div>

            <div>
              <h3 className="font-semibold text-lg text-foreground mb-2 flex items-center gap-2"><SmileIcon className="text-accent"/>Behavior</h3>
              <p className="text-foreground/80">{cat.behavior}</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg text-foreground mb-2 flex items-center gap-2"><StethoscopeIcon className="text-accent"/>Health Condition</h3>
              <p className="text-foreground/80">{cat.healthCondition}</p>
            </div>

            <div>
              <h3 className="font-semibold text-lg text-foreground mb-2 flex items-center gap-2"><HeartIcon className="text-accent"/>Story</h3>
              <p className="text-foreground/80 leading-relaxed">{cat.story}</p>
            </div>
            
            {cat.adoptionStatus === 'available' && (
              <AdoptionForm cat={cat}>
                <Button size="lg" className="w-full btn-primary text-lg py-3 mt-4 shadow-md hover:shadow-lg transition-shadow">
                  I want to adopt {cat.name}!
                </Button>
              </AdoptionForm>
            )}
            {cat.adoptionStatus === 'pending' && (
              <Button size="lg" className="w-full text-lg py-3 mt-4" variant="outline" disabled>
                Adoption Pending
              </Button>
            )}
            {cat.adoptionStatus === 'adopted' && (
              <Button size="lg" className="w-full text-lg py-3 mt-4" variant="destructive" disabled>
                Already Adopted
              </Button>
            )}
             <Button variant="outline" asChild className="w-full mt-2">
                <Link href="/browse-cats">Back to Browse</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

interface InfoItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const InfoItem = ({ icon, label, value }: InfoItemProps) => (
  <div className="flex items-start gap-2">
    <span className="text-accent mt-0.5">{React.cloneElement(icon as React.ReactElement, { className: "h-5 w-5" })}</span>
    <div>
      <p className="font-medium text-foreground">{label}</p>
      <p className="text-muted-foreground">{value}</p>
    </div>
  </div>
);
