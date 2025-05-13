import React from 'react';
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
  return []; 
}

interface CatProfilePageProps {
  params: { id: string };
}

// Helper for Arabic pluralization of "year"
const getArabicAgeString = (age: number): string => {
  if (age === 1) return "سنة واحدة";
  if (age === 2) return "سنتان";
  if (age >= 3 && age <= 10) return `${age} سنوات`;
  return `${age} سنة`;
};

const getAdoptionStatusText = (status: 'available' | 'pending' | 'adopted'): string => {
  switch (status) {
    case 'available': return 'متاح';
    case 'pending': return 'قيد الانتظار';
    case 'adopted': return 'تم تبنيه';
    default: return status;
  }
};


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
            alt={`الصورة الرئيسية لـ ${cat.name}`}
            width={700}
            height={500}
            className="w-full h-auto object-cover rounded-lg shadow-xl border-2 border-primary/50"
            priority 
            data-ai-hint="buff kitten"
          />
          {cat.images.length > 1 && (
            <div className="grid grid-cols-3 gap-2">
              {cat.images.slice(1, 4).map((img, index) => ( 
                <Image
                  key={index}
                  src={img}
                  alt={`${cat.name} صورة مصغرة ${index + 1}`}
                  width={200}
                  height={150}
                  className="w-full h-32 object-cover rounded-md shadow-md hover:opacity-80 transition-opacity"
                  data-ai-hint="buff kitten"
                />
              ))}
            </div>
          )}
        </div>

        {/* Cat Details */}
        <Card className="shadow-xl">
          <CardHeader className="text-right">
            <div className="flex justify-between items-center">
              <CardTitle className="text-4xl font-extrabold text-primary">{cat.name}</CardTitle>
              <Badge 
                variant={cat.adoptionStatus === 'adopted' ? 'destructive' : (cat.adoptionStatus === 'pending' ? 'secondary' : 'default')} 
                className="text-sm px-3 py-1 capitalize"
              >
                {getAdoptionStatusText(cat.adoptionStatus)}
              </Badge>
            </div>
            <CardDescription className="text-lg text-muted-foreground">{cat.breed}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 text-right">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <InfoItem icon={<CalendarIcon />} label="العمر" value={getArabicAgeString(cat.age)} />
              <InfoItem icon={<TagIcon />} label="الجنس" value={cat.gender === "Male" ? "ذكر" : cat.gender === "Female" ? "أنثى" : "غير معروف"} />
              <InfoItem icon={<MapPinIcon />} label="الموقع" value={cat.location} />
              {owner && (
                <InfoItem icon={<UserCircleIcon />} label="نشر بواسطة" value={owner.name} />
              )}
            </div>

            <div>
              <h3 className="font-semibold text-lg text-foreground mb-2 flex items-center justify-end gap-2"><SmileIcon className="text-accent order-last"/>السلوك</h3>
              <p className="text-foreground/80">{cat.behavior}</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg text-foreground mb-2 flex items-center justify-end gap-2"><StethoscopeIcon className="text-accent order-last"/>الحالة الصحية</h3>
              <p className="text-foreground/80">{cat.healthCondition}</p>
            </div>

            <div>
              <h3 className="font-semibold text-lg text-foreground mb-2 flex items-center justify-end gap-2"><HeartIcon className="text-accent order-last"/>القصة</h3>
              <p className="text-foreground/80 leading-relaxed">{cat.story}</p>
            </div>
            
            {cat.adoptionStatus === 'available' && (
              <AdoptionForm cat={cat}>
                <Button size="lg" className="w-full btn-primary text-lg py-3 mt-4 shadow-md hover:shadow-lg transition-shadow">
                  أريد تبني {cat.name}!
                </Button>
              </AdoptionForm>
            )}
            {cat.adoptionStatus === 'pending' && (
              <Button size="lg" className="w-full text-lg py-3 mt-4" variant="outline" disabled>
                التبني قيد الانتظار
              </Button>
            )}
            {cat.adoptionStatus === 'adopted' && (
              <Button size="lg" className="w-full text-lg py-3 mt-4" variant="destructive" disabled>
                تم تبنيه بالفعل
              </Button>
            )}
             <Button variant="outline" asChild className="w-full mt-2">
                <Link href="/browse-cats">العودة إلى التصفح</Link>
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
  <div className="flex items-start gap-2 justify-end"> {/* justify-end for RTL */}
    <div className="text-right"> {/* Ensure text aligns right */}
      <p className="font-medium text-foreground">{label}</p>
      <p className="text-muted-foreground">{value}</p>
    </div>
    <span className="text-accent mt-0.5">{React.cloneElement(icon as React.ReactElement, { className: "h-5 w-5" })}</span> {/* Icon after text */}
  </div>
);
