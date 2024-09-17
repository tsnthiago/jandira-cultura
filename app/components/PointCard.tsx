// ./app/components/PointCard.tsx

import Image from 'next/image';
import { Tag, MapPin, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils'; // Importe a função cn para classes condicionais

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
  onClick?: (point: Point) => void;
}

const PointCard: React.FC<PointCardProps> = ({ point, onClick }) => (
  <div
    className={cn(
      'relative bg-white rounded-lg overflow-hidden shadow-md transform transition duration-300 hover:scale-105',
      'dark:bg-gray-800 dark:border-gray-700' // Classes para modo escuro
    )}
  >
    <div className="relative h-48">
      {point.image ? (
        <Image
          src={point.image}
          alt={`Imagem de ${point.title}`}
          layout="fill"
          objectFit="cover"
          className="rounded-t-lg" // Bordas arredondadas no topo
        />
      ) : (
        <div className="w-full h-48 bg-gray-300 rounded-t-lg flex items-center justify-center">
          <span className="text-gray-500">Imagem não disponível</span>
        </div>
      )}
    </div>
    <div className="p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {point.title}
        </h3>
        {point.location && (
          <span className="text-gray-500 dark:text-gray-400">
            <MapPin size={16} />
          </span>
        )}
      </div>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        {point.description.substring(0, 100)}...
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {point.tags.map((tag) => (
          <span
            key={tag}
            className={cn(
              'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium',
              'bg-blue-100 text-blue-800',
              'dark:bg-blue-600 dark:text-white' // Classes para modo escuro
            )}
          >
            <Tag className="mr-1 h-3 w-3" />
            {tag}
          </span>
        ))}
      </div>
      <Button
        variant="outline"
        className="mt-4 w-full"
        onClick={() => onClick && onClick(point)} // Chamada condicional
      >
        Saiba mais
        <ChevronRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  </div>
);

export default PointCard;