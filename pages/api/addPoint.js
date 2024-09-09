import clientPromise from '../../lib/mongodb';

const isValidYouTubeUrl = (url) => {
  const regex = /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|embed\/|v\/|.+\?v=)|youtu\.be\/)[\w-]{11}$/;
  return regex.test(url);
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { title, description, videoId, tags } = req.body;

    if (!title || !description || !isValidYouTubeUrl(videoId)) {
      return res.status(400).json({ message: 'Preencha todos os campos corretamente e insira um ID de vídeo válido!' });
    }

    try {
      const client = await clientPromise;
      const db = client.db('jandira-cultura');

      const newPoint = {
        title,
        description,
        videoId,
        tags: tags.split(',').map(tag => tag.trim()),
        createdAt: new Date(),
      };

      const result = await db.collection('points').insertOne(newPoint);
      res.status(201).json({ message: 'Ponto turístico adicionado com sucesso!', result });
    } catch (error) {
      console.error("Erro ao inserir ponto turístico:", error);
      res.status(500).json({ error: 'Erro ao adicionar o ponto turístico' });
    }
  } else {
    res.status(405).json({ message: 'Método não permitido' });
  }
}
