// pages/points.tsx
"use client";

import { useState, useEffect } from 'react';
import PointCard from '../components/PointCard';

const Points = () => {
    const [points, setPoints] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const pointsPerPage = 6;  // Alterei para 6 pontos por página para fazer mais sentido com a exibição de 3 cards por linha

    useEffect(() => {
        fetch(`/api/points?page=${currentPage}&limit=${pointsPerPage}`)
            .then(response => response.json())
            .then(data => setPoints(data))
            .catch(error => console.error("Erro ao carregar os pontos turísticos:", error));
    }, [currentPage]);

    const handleNextPage = () => setCurrentPage(prev => prev + 1);
    const handlePreviousPage = () => setCurrentPage(prev => Math.max(1, prev - 1));

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-4xl font-bold text-center mb-8 text-blue-600">Pontos Turísticos</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {points.map((point, index) => (
                    <PointCard key={index} point={point} />
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
