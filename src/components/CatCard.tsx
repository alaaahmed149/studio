import Image from 'next/image';
import Link from 'next/link';
import type { Cat } from '@/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPinIcon, CalendarIcon, CatIcon as BreedIcon } from 'lucide-react'; // Renamed CatIcon to BreedIcon to avoid conflict

interface CatCardProps {
  cat: Cat;
}

const CatCard = ({ cat }: CatCardProps) => {
  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
      <CardHeader className="p-0 relative">
        <Link href={`/cats/${cat.id}`} aria-label={`View details for ${cat.name}`}>
          <Image
            src={cat.images[0]}
            alt={`Photo of ${cat.name}`}
            width={400}
            height={250}
            className="w-full h-56 object-cover transition-transform duration-300 hover:scale-105"
            data-ai-hint="cat image"
          />
        </Link>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <div className="flex justify-between items-start mb-2">
          <CardTitle className="text-2xl font-bold text-primary">
            <Link href={`/cats/${cat.id}`}>{cat.name}</Link>
          </CardTitle>
          <Badge variant={cat.adoptionStatus === 'adopted' ? 'destructive' : (cat.adoptionStatus === 'pending' ? 'secondary' : 'default')} className="capitalize">
            {cat.adoptionStatus}
          </Badge>
        </div>
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <BreedIcon className="h-4 w-4 text-accent" />
            <span>{cat.breed} - {cat.gender}</span>
          </div>
          <div className="flex items-center gap-2">
            <CalendarIcon className="h-4 w-4 text-accent" />
            <span>{cat.age} year{cat.age !== 1 ? 's' : ''} old</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPinIcon className="h-4 w-4 text-accent" />
            <span>{cat.location}</span>
          </div>
        </div>
        <p className="mt-3 text-foreground/80 text-sm line-clamp-3 h-[3.75rem]"> {/* approx 3 lines */}
          {cat.story}
        </p>
      </CardContent>
      <CardFooter className="p-4 border-t">
        <Button asChild variant="outline" className="w-full btn-accent hover:bg-accent/80">
          <Link href={`/cats/${cat.id}`}>View Profile</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CatCard;
