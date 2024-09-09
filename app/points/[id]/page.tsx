"use client";

import { useState, useEffect } from 'react';
import PointCard from '../../components/PointCard';

const Points = () => {
    const [points, setPoints] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/points')
            .then(response => response.json())
            .then(data => {
                setPoints(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Erro ao carregar os pontos turísticos:", error);
                setLoading(false);
            });
    }, []);

    return (
        <div>
            <main className="container mx-auto p-8">
                <h1 className="text-4xl font-bold text-center mb-8">Pontos Turísticos</h1>
                {loading ? (
                    <p className="text-center">Carregando pontos turísticos...</p>
                ) : points.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {points.map((point, index) => (
                            <PointCard key={index} point={point} />
                        ))}
                    </div>
                ) : (
                    <p className="text-center">Nenhum ponto turístico encontrado.</p>
                )}
            </main>
        </div>
    );
};

export default Points;
