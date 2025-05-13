import Image from 'next/image';
import Link from 'next/link';
import type { Cat } from '@/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPinIcon, CalendarIcon, CatIcon as BreedIcon } from 'lucide-react'; 

interface CatCardProps {
  cat: Cat;
}

// Helper for Arabic pluralization of "year"
const getArabicAgeString = (age: number): string => {
  if (age === 0.5) return "٦ أشهر"; // Specific case for 6 months if needed often
  if (age === 1) return "سنة واحدة";
  if (age === 2) return "سنتان";
  if (age >= 3 && age <= 10) return `${Math.floor(age)} سنوات`; // Use Math.floor for cases like 0.5
  return `${Math.floor(age)} سنة`;
};

const getAdoptionStatusText = (status: 'available' | 'pending' | 'adopted'): string => {
  switch (status) {
    case 'available': return 'متاح';
    case 'pending': return 'قيد الانتظار';
    case 'adopted': return 'تم تبنيه';
    default: return status;
  }
};

const getGenderText = (gender: 'Male' | 'Female' | 'Unknown'): string => {
    switch (gender) {
        case 'Male': return 'ذكر';
        case 'Female': return 'أنثى';
        case 'Unknown': return 'غير معروف';
        default: return gender;
    }
};

const CatCard = ({ cat }: CatCardProps) => {
  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
      <CardHeader className="p-0 relative">
        <Link href={`/cats/${cat.id}`} aria-label={`عرض تفاصيل ${cat.name}`}>
          <Image
            src={cat.images[0]}
            alt={`صورة ${cat.name}`}
            width={400}
            height={250}
            className="w-full h-56 object-cover transition-transform duration-300 hover:scale-105"
            data-ai-hint="cat image"
          />
        </Link>
      </CardHeader>
      <CardContent className="p-4 flex-grow text-right">
        <div className="flex justify-between items-start mb-2">
          <CardTitle className="text-2xl font-bold text-primary">
            <Link href={`/cats/${cat.id}`}>{cat.name}</Link>
          </CardTitle>
          <Badge 
            variant={cat.adoptionStatus === 'adopted' ? 'destructive' : (cat.adoptionStatus === 'pending' ? 'secondary' : 'default')} 
            className="capitalize"
          >
            {getAdoptionStatusText(cat.adoptionStatus)}
          </Badge>
        </div>
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center justify-end gap-2"> {/* justify-end and icon order for RTL */}
            <span>{cat.breed} - {getGenderText(cat.gender)}</span>
            <BreedIcon className="h-4 w-4 text-accent" />
          </div>
          <div className="flex items-center justify-end gap-2">
            <span>{getArabicAgeString(cat.age)}</span>
            <CalendarIcon className="h-4 w-4 text-accent" />
          </div>
          <div className="flex items-center justify-end gap-2">
            <span>{cat.location}</span>
            <MapPinIcon className="h-4 w-4 text-accent" />
          </div>
        </div>
        <p className="mt-3 text-foreground/80 text-sm line-clamp-3 h-[3.75rem]">
          {cat.story}
        </p>
      </CardContent>
      <CardFooter className="p-4 border-t">
        <Button asChild variant="outline" className="w-full btn-accent hover:bg-accent/80">
          <Link href={`/cats/${cat.id}`}>عرض الملف الشخصي</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CatCard;

