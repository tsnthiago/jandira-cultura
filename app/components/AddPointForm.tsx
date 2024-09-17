'use client';

import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

interface PointData {
  title: string;
  description: string;
  videoId: string;
  imageUrl: string; // Novo campo para a URL da imagem
  tags: string;
  latitude: number; // Novo campo para latitude
  longitude: number; // Novo campo para longitude
}

const AddPointForm: React.FC = () => {
  const [formData, setFormData] = useState<PointData>({
    title: '',
    description: '',
    videoId: '',
    imageUrl: '',
    tags: '',
    latitude: 0,
    longitude: 0,
  });

  const extractYouTubeId = (url: string): string | null => {
    const regex = /(?:youtube\.com.*(?:\\?|&)v=|youtu\.be\/)([^&]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    // Atualiza o estado do formulário com o valor do campo correspondente
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));

    if (e.target.name === 'videoId') {
      const videoId = extractYouTubeId(e.target.value);
      setFormData((prevData) => ({
        ...prevData,
        videoId: videoId || '',
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/points', {
        // Rota da API para adicionar pontos
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success('Ponto turístico adicionado com sucesso!');
        setFormData({
          title: '',
          description: '',
          videoId: '',
          imageUrl: '',
          tags: '',
          latitude: 0,
          longitude: 0,
        }); // Limpa o formulário
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || 'Erro ao adicionar ponto turístico.');
      }
    } catch (error) {
      console.error('Erro ao adicionar ponto turístico:', error);
      toast.error('Erro ao adicionar ponto turístico.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="title">Título</Label>
        <Input
          id="title"
          name="title"
          type="text"
          value={formData.title}
          onChange={handleChange}
          placeholder="Digite o título do ponto turístico"
          className="w-full"
        />
      </div>
      <div>
        <Label htmlFor="description">Descrição</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Digite a descrição do ponto turístico"
          className="w-full"
        />
      </div>
      <div>
        <Label htmlFor="videoId">ID do Vídeo do YouTube</Label>
        <Input
          id="videoId"
          name="videoId"
          type="text"
          value={formData.videoId}
          onChange={handleChange}
          placeholder="Digite o ID do vídeo do YouTube"
          className="w-full"
        />
      </div>
      <div>
        <Label htmlFor="imageUrl">URL da Imagem</Label>
        <Input
          id="imageUrl"
          name="imageUrl"
          type="text"
          value={formData.imageUrl}
          onChange={handleChange}
          placeholder="Digite a URL da imagem"
          className="w-full"
        />
      </div>
      <div>
        <Label htmlFor="tags">Tags (separadas por vírgula)</Label>
        <Input
          id="tags"
          name="tags"
          type="text"
          value={formData.tags}
          onChange={handleChange}
          placeholder="Digite as tags separadas por vírgula"
          className="w-full"
        />
      </div>
      <div className="flex space-x-4">
        <div>
          <Label htmlFor="latitude">Latitude</Label>
          <Input
            id="latitude"
            name="latitude"
            type="number"
            value={formData.latitude}
            onChange={handleChange}
            placeholder="Digite a latitude"
            className="w-full"
          />
        </div>
        <div>
          <Label htmlFor="longitude">Longitude</Label>
          <Input
            id="longitude"
            name="longitude"
            type="number"
            value={formData.longitude}
            onChange={handleChange}
            placeholder="Digite a longitude"
            className="w-full"
          />
        </div>
      </div>
      <Button type="submit" className="w-full">
        Adicionar Ponto Turístico
      </Button>
    </form>
  );
};

export default AddPointForm;