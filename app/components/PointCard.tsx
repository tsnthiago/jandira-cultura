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
    <div className="point-card">
        <h2>{point.title}</h2>
        <p>{point.description}</p>
        <YouTubeEmbed videoId={point.videoId} />
        <p>Tags: {point.tags.join(', ')}</p>
    </div>
);

export default PointCard;
