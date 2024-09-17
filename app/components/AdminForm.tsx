// components/AdminForm.tsx
import { useState } from 'react';
import { toast } from 'react-hot-toast';

// Defina a interface para as propriedades que o componente espera receber
interface AdminFormProps {
  onSave: (newPoint: {
    title: string;
    description: string;
    videoId: string;
    tags: string;
  }) => void;
}

const AdminForm: React.FC<AdminFormProps> = ({ onSave }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [videoId, setVideoId] = useState('');
  const [tags, setTags] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Crie o objeto newPoint com os dados do formulário
    const newPoint = { title, description, videoId, tags };

    // Validação simples (você pode aprimorar isso)
    if (!title || !description || !videoId) {
      toast.error('Preencha todos os campos obrigatórios!');
      return;
    }

    onSave(newPoint); // Chame a função onSave que foi passada como props
    toast.success('Ponto turístico adicionado com sucesso!');

    // Limpe os campos do formulário após o envio
    setTitle('');
    setDescription('');
    setVideoId('');
    setTags('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto mt-10"
    >
      <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">
        Administração
      </h2>
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
        <label className="block text-gray-700 font-bold mb-2">
          ID do Vídeo
        </label>
        <input
          type="text"
          value={videoId}
          onChange={(e) => setVideoId(e.target.value)}
          className="border border-gray-300 p-2 w-full rounded-md"
          placeholder="Digite o ID ou URL do vídeo"
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
      >
        Salvar
      </button>
    </form>
  );
};

export default AdminForm;
