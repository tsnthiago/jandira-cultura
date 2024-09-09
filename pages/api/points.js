// pages/api/points.js

import clientPromise from '../../lib/mongodb'; // Atualizado para o caminho correto

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db('jandira-cultura'); // Nome do seu banco de dados

    const points = await db.collection('points').find({}).toArray();

    res.status(200).json(points);
  } catch (error) {
    console.error("Erro ao conectar com o MongoDB:", error);
    res.status(500).json({ error: 'Erro ao carregar os pontos turísticos' });
  }
}
