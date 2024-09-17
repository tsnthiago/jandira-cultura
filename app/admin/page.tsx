// app/admin/page.tsx

"use client";

import { useState } from 'react';
import AdminForm from '../components/AdminForm';
import { toast } from 'react-hot-toast';
import AddPointForm from '../components/AddPointForm';

const Admin = () => {
    const [points, setPoints] = useState<any[]>([]);

    const handleSave = async (newPoint: any) => {
        try {
            const response = await fetch(`/api/admin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newPoint),
            });
            const savedPoint = await response.json();
            if (response.ok) {
                setPoints([...points, savedPoint.result]);
                toast.success(savedPoint.message);
            } else {
                toast.error(savedPoint.message || 'Erro ao adicionar o ponto turístico');
            }
        } catch (error) {
            toast.error('Erro ao adicionar o ponto turístico');
            console.error(error);
        }
    };

    return (
        <div>
            <main className="container mx-auto p-8"> {/* Adiciona um container para melhor layout */}
                <h1 className="text-3xl font-bold mb-6">Painel Administrativo</h1>

                {/* Adiciona o novo componente de formulário */}
                <AddPointForm />
                <div className="mt-8">
                    {points.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {points.map((point, index) => (
                                <div key={point._id} className="p-4 border rounded shadow">
                                    <h3 className="text-xl font-bold">{point.title}</h3>
                                    <p>{point.description}</p>
                                    <p><strong>Tags:</strong> {point.tags.join(', ')}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center">Nenhum ponto turístico adicionado ainda.</p>
                    )}
                </div>
            </main>
        </div>
    );
};

export default Admin;
