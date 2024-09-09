import clientPromise from '../../lib/mongodb';

const extractYouTubeId = (url) => {
  const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { title, description, videoId: videoUrl, tags } = req.body;

    const extractedVideoId = extractYouTubeId(videoUrl); // Extract only the video ID

    if (!title || !description || !extractedVideoId) {
      return res.status(400).json({ message: 'Preencha todos os campos corretamente e insira um ID de vídeo válido!' });
    }

    try {
      const client = await clientPromise;
      const db = client.db('jandira-cultura');

      const newPoint = {
        title,
        description,
        videoId: extractedVideoId,  // Save only the video ID
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
