// ./app/components/PointCard.tsx

import Image from 'next/image';
import { Tag, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

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
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
        {point.image ? (
            <Image
                src={point.image}
                alt={point.title}
                width={400}
                height={300}
                className="w-full h-48 object-cover rounded-t-md"
                onError={(e) => {
                    e.currentTarget.src = "/placeholder.jpg";
                }}
            />
        ) : (
            <div className="w-full h-48 bg-gray-300 rounded-t-md flex items-center justify-center">
                <span className="text-gray-500">Imagem não disponível</span>
            </div>
        )}

        <CardHeader>
            <CardTitle>{point.title}</CardTitle>
            <CardDescription>{point.description.substring(0, 100)}...</CardDescription>
        </CardHeader>

        <CardContent>
            <div className="flex flex-wrap gap-2">
                {point.tags.map((tag: string) => (
                    <span key={tag} className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
                        <Tag className="mr-1 h-3 w-3" />
                        {tag}
                    </span>
                ))}
            </div>
        </CardContent>

        <CardFooter>
            <Button variant="outline" className="w-full" onClick={onClick || (() => console.log('Card clicado'))}>
                Saiba mais
                <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
        </CardFooter>

    </Card>
);

export default PointCard;
