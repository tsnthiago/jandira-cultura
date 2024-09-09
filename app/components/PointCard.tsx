import YouTubeEmbed from './YouTubeEmbed';

interface Point {
    title: string;
    description: string;
    videoId: string;
    tags: string[];
    createdAt: string;  // Supondo que a data de criação está disponível
    location?: string;  // Supondo que existe um campo para a localização do ponto turístico
}

interface PointCardProps {
    point: Point;
}

const PointCard: React.FC<PointCardProps> = ({ point }) => (
    <div className="border border-gray-300 rounded-lg p-6 shadow-lg bg-white hover:shadow-2xl transition-shadow duration-300 hover:scale-105 transform transition-transform">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">{point.title}</h2>

        {/* Descrição */}
        <p className="mb-4 text-gray-700">{point.description}</p>

        {/* Localização, se disponível */}
        {point.location && (
            <p className="text-sm text-gray-600 mb-2">
                <span className="font-semibold">Localização:</span> {point.location}
            </p>
        )}

        {/* Embed do YouTube */}
        <div className="relative overflow-hidden rounded-lg mb-4" style={{ paddingBottom: '56.25%' }}>
            <iframe
                className="absolute top-0 left-0 w-full h-full rounded-lg"
                src={`https://www.youtube.com/embed/${point.videoId}`}
                title={point.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            ></iframe>
        </div>

        {/* Tags */}
        <div className="mt-4">
            <p className="font-semibold text-gray-600">Tags:</p>
            <p className="text-sm text-gray-500">{point.tags.join(', ')}</p>
        </div>

        {/* Data de criação */}
        <div className="mt-2 text-sm text-gray-400">
            <span className="font-semibold">Adicionado em:</span> {new Date(point.createdAt).toLocaleDateString()}
        </div>

        {/* Botões de interação */}
        <div className="mt-4 flex justify-between">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Ver Mais
            </button>
            <button className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400">
                Compartilhar
            </button>
        </div>
    </div>
);

export default PointCard;
