import { useState } from 'react';

const AdminForm = ({ onSave }: { onSave: (newPoint: any) => void }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [videoId, setVideoId] = useState('');
    const [tags, setTags] = useState('');

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        const newPoint = {
            title,
            description,
            videoId,
            tags: tags.split(',').map(tag => tag.trim())
        };
        onSave(newPoint);
        setTitle('');
        setDescription('');
        setVideoId('');
        setTags('');
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-8 max-w-lg mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">Administração</h2>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Título</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                    placeholder="Digite o título"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Descrição</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                    placeholder="Digite a descrição"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">ID do Vídeo</label>
                <input
                    type="text"
                    value={videoId}
                    onChange={(e) => setVideoId(e.target.value)}
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                    placeholder="Digite o ID do vídeo no YouTube"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Tags</label>
                <input
                    type="text"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                    placeholder="Digite as tags separadas por vírgula"
                    required
                />
            </div>
            <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors"
            >
                Salvar
            </button>
        </form>
    );
};

export default AdminForm;
