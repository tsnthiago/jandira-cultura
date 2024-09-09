// components/AdminForm.tsx

import { useState } from 'react';
import { toast } from 'react-hot-toast';

const isValidYouTubeUrl = (url: string) => {
    const regex = /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|embed\/|v\/|.+\?v=)|youtu\.be\/)[\w-]{11}$/;
    return regex.test(url);
};

const AdminForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [videoId, setVideoId] = useState('');
    const [tags, setTags] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);  // Mostra o spinner de carregamento

        const newPoint = { title, description, videoId, tags };

        try {
            const response = await fetch('/api/addPoint', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newPoint),
            });

            const data = await response.json();
            if (response.ok) {
                toast.success('Ponto turístico adicionado com sucesso!');
                setTitle('');
                setDescription('');
                setVideoId('');
                setTags('');
            } else {
                toast.error(data.message || 'Erro ao adicionar ponto turístico');
            }
        } catch (error) {
            toast.error('Erro ao enviar o formulário');
        } finally {
            setLoading(false);  // Esconde o spinner de carregamento
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto mt-10">
            <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">Administração</h2>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Título</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="border border-gray-300 p-2 w-full rounded-md"
                    placeholder="Digite o título"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Descrição</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="border border-gray-300 p-2 w-full rounded-md"
                    placeholder="Digite a descrição"
                ></textarea>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">ID ou URL do Vídeo</label>
                <input
                    type="text"
                    value={videoId}
                    onChange={(e) => setVideoId(e.target.value)}
                    className="border border-gray-300 p-2 w-full rounded-md"
                    placeholder="Digite o ID do vídeo ou URL do YouTube"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Tags</label>
                <input
                    type="text"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    className="border border-gray-300 p-2 w-full rounded-md"
                    placeholder="Digite as tags separadas por vírgula"
                />
            </div>
            <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                disabled={loading}
            >
                {loading ? 'Salvando...' : 'Salvar'}
            </button>
        </form>
    );
};

export default AdminForm;