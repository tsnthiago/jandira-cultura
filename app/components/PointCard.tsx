import YouTubeEmbed from './YouTubeEmbed';

interface Point {
    title: string;
    description: string;
    videoId: string;
    tags: string[];
}

interface PointCardProps {
    point: Point;
}

const PointCard: React.FC<PointCardProps> = ({ point }) => (
    <div className="border border-gray-300 rounded-lg p-6 shadow-lg bg-white hover:shadow-2xl transition-shadow duration-300">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">{point.title}</h2>
        <p className="mb-4 text-gray-700">{point.description}</p>
        <YouTubeEmbed videoId={point.videoId} />
        <div className="mt-4">
            <p className="font-semibold text-gray-600">Tags:</p>
            <p className="text-sm text-gray-500">{point.tags.join(', ')}</p>
        </div>
    </div>
);

export default PointCard;
