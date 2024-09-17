// ./app/components/PointCard.tsx

import Image from 'next/image';
import { Tag, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';

interface Point {
  _id: string;
  title: string;
  image: string;
  description: string;
  videoId: string;
  tags: string[];
  createdAt: string;
  location?: { lat: number; lng: number };
}

interface PointCardProps {
  point: Point;
  onClick?: () => void;
}

const PointCard: React.FC<PointCardProps> = ({ point, onClick }) => (
  <Card
    className="overflow-hidden hover:shadow-lg transition-shadow duration-300 rounded-lg" // Adicione bordas arredondadas
  >
    <div className="relative w-full h-48">
      {point.image ? (
        <Image
          src={point.image}
          alt={`Imagem de ${point.title}`}
          layout="fill"
          objectFit="cover"
          className="rounded-t-md"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = 'placeholder.jpg';
          }}
        />
      ) : (
        <div className="w-full h-48 bg-gray-300 rounded-t-md flex items-center justify-center">
          <span className="text-gray-500">Imagem não disponível</span>
        </div>
      )}
    </div>

    <CardHeader>
      <CardTitle>{point.title}</CardTitle>
      <CardDescription>
        {point.description.substring(0, 100)}...
      </CardDescription>
    </CardHeader>

    <CardContent>
      <div className="flex flex-wrap gap-2">
        {point.tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm"
          >
            <Tag className="mr-1 h-4 w-4" />
            {tag}
          </span>
        ))}
      </div>
    </CardContent>

    <CardFooter>
      <Button variant="outline" className="w-full" onClick={onClick}>
        Saiba mais
        <ChevronRight className="ml-2 h-4 w-4" />
      </Button>
    </CardFooter>
  </Card>
);

export default PointCard;