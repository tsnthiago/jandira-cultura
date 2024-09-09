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
                <AdminForm onSave={handleSave} />
                <div>
                    {points.map((point, index) => (
                        <p key={index}>{point.title}</p>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default Admin;
