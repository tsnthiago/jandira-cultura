import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Extract the data from the request body
    const { title, description, videoId, tags } = req.body;

    // Add your validation or logic to process the data
    if (!title || !description || !videoId) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
      // Connect to MongoDB
      const client = await clientPromise;
      const db = client.db('jandira-cultura');

      const newPoint = {
        title,
        description,
        videoId,
        tags: tags.split(',').map(tag => tag.trim()),
        createdAt: new Date(),
      };

      // Insert the new point into the MongoDB collection
      const result = await db.collection('points').insertOne(newPoint);

      // Return a success message
      return res.status(201).json({ message: 'Ponto turístico adicionado com sucesso!', result });
    } catch (error) {
      console.error('Erro ao inserir ponto turístico:', error);
      return res.status(500).json({ message: 'Erro ao adicionar o ponto turístico' });
    }
  } else {
    // If the request method is not POST
    return res.status(405).json({ message: 'Método não permitido' });
  }
}
