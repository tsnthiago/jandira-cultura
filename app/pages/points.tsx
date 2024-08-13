import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PointCard from '../components/PointCard';

const Points = () => {
    const [points, setPoints] = useState([]);

    useEffect(() => {
        fetch('/api/points')
            .then(response => response.json())
            .then(data => setPoints(data));
    }, []);

    return (
        <div>
            <Header />
            <main>
                <h1>Pontos Turísticos</h1>
                {points.length > 0 ? (
                    points.map((point, index) => (
                        <PointCard key={index} point={point} />
                    ))
                ) : (
                    <p>Carregando pontos turísticos...</p>
                )}
            </main>
            <Footer />
        </div>
    );
};

export default Points;
