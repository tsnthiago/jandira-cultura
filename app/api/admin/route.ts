// app/api/admin/route.ts

import { InsertOneResult, Document, ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongodb';

// Interface para o novo ponto sem o campo _id
interface NewPoint {
  title: string;
  image: string;
  description: string;
  videoId: string;
  tags: string[];
  createdAt: string;
  location?: { lat: number; lng: number };
}

export async function POST(request: Request) {
  try {
    const { title, description, videoId, tags, imageUrl, latitude, longitude } =
      await request.json();

    // Validação dos campos obrigatórios
    if (!title || !description || !videoId || !imageUrl) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Conexão com o MongoDB
    const client = await clientPromise;
    const db = client.db('jandira-cultura');

    const newPoint: NewPoint = {
      title,
      description,
      videoId,
      image: imageUrl,
      tags: tags.split(',').map((tag: string) => tag.trim()),
      location: { lat: latitude, lng: longitude },
      createdAt: new Date().toISOString(),
    };

    // Inserção do novo ponto na coleção do MongoDB
    const result: InsertOneResult<Document> = await db
      .collection('points')
      .insertOne(newPoint);

    // Retorno de sucesso
    return NextResponse.json(
      { message: 'Ponto turístico adicionado com sucesso!', result },
      { status: 201 }
    );
  } catch (error) {
    console.error('Erro ao inserir ponto turístico:', error);
    return NextResponse.json(
      { message: 'Erro ao adicionar o ponto turístico' },
      { status: 500 }
    );
  }
}

// Opcional: Adicione uma função GET se necessário
export async function GET(request: Request) {
  return NextResponse.json(
    { message: 'GET não implementado para /api/admin' },
    { status: 200 }
  );
}