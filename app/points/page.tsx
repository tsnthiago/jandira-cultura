'use client';

import { useState, useEffect } from 'react';
import PointCard from '../components/PointCard';

// Helper function to extract the video ID from a YouTube URL
const extractYouTubeId = (url: string) => {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;  // Return only the video ID
};

const Points = () => {
    const [points, setPoints] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const pointsPerPage = 9;

    useEffect(() => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
        console.log('apiUrl: ' + apiUrl);

        const fetchData = async () => {
            try {
                const response = await fetch(`${apiUrl}/api/points?page=${currentPage}&limit=${pointsPerPage}`);
                console.log('response: ' + response);
                const data = await response.json();

                // Modify the points data to include only the video ID
                const updatedPoints = data.map((point: any) => ({
                    ...point,
                    videoId: extractYouTubeId(point.videoId), // Extract the video ID from the URL
                }));

                setPoints(updatedPoints);
            } catch (error) {
                console.error("Erro ao carregar os pontos turísticos:", error);
            }
        };

        fetchData();
    }, [currentPage]);

    const handleNextPage = () => setCurrentPage(prev => prev + 1);
    const handlePreviousPage = () => setCurrentPage(prev => Math.max(1, prev - 1));

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-4xl font-bold text-center mb-8 text-blue-600">Pontos Turísticos</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {points.map((point: any) => (
                    <PointCard key={point._id} point={point} />
                ))}
            </div>
            <div className="flex justify-center mt-8">
                <button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md mr-4 hover:bg-blue-700 disabled:opacity-50"
                >
                    Página Anterior
                </button>
                <button
                    onClick={handleNextPage}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
                >
                    Próxima Página
                </button>
            </div>
        </div>
    );
};

export default Points;
