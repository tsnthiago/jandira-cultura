import clientPromise from '../../../lib/mongodb';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { title, description, videoId, tags } = await request.json();

    // Verificação de campos obrigatórios
    if (!title || !description || !videoId) {
      return NextResponse.json({ message: 'Campos obrigatórios estão ausentes' }, { status: 400 });
    }

    // Conexão com o MongoDB
    const client = await clientPromise;
    const db = client.db('jandira-cultura');

    const newPoint = {
      title,
      description,
      videoId,
      tags: tags.split(',').map((tag: string) => tag.trim()),
      createdAt: new Date(),
    };

    // Inserção no banco de dados
    const result = await db.collection('points').insertOne(newPoint);

    // Resposta de sucesso
    return NextResponse.json({ message: 'Ponto turístico adicionado com sucesso!', result }, { status: 201 });
  } catch (error) {
    console.error('Erro ao adicionar o ponto turístico:', error);
    return NextResponse.json({ message: 'Erro ao adicionar o ponto turístico' }, { status: 500 });
  }
}