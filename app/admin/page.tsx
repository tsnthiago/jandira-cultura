"use client";

import { useState } from 'react';
import AdminForm from '../components/AdminForm';

const Admin = () => {
    const [points, setPoints] = useState<any[]>([]);

    const handleSave = async (newPoint: any) => {
        const response = await fetch('/api/admin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newPoint),
        });
        const savedPoint = await response.json();
        setPoints([...points, savedPoint]);
    };

    return (
        <div>
            <main>
                <h1>Administração</h1>
                <AdminForm onSave={handleSave} />
                <div>
                    <h2>Pontos Cadastrados</h2>
                    {points.map((point, index) => (
                        <p key={index}>{point.title}</p>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default Admin;
