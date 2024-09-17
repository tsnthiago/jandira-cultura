// app/api/points/route.ts

import { NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongodb';
import { InsertOneResult, ObjectId, Document } from 'mongodb';

// Interface para o ponto turístico
interface Point {
  _id: ObjectId;
  title: string;
  image: string;
  description: string;
  videoId: string;
  tags: string[];
  createdAt: string;
  location?: { lat: number; lng: number };
}

interface NewPoint {
  title: string;
  image: string;
  description: string;
  videoId: string;
  tags: string[];
  createdAt: string;
  location?: { lat: number; lng: number };
}

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '10');
    const search = url.searchParams.get('search') || '';
    const skip = (page - 1) * limit;

    const client = await clientPromise;
    const db = client.db('jandira-cultura');

    // Cria a query de pesquisa (case-insensitive)
    const query = search
      ? {
          $or: [
            { title: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } },
            { tags: { $in: [new RegExp(search, 'i')] } },
          ],
        }
      : {};

    // **Importante: Use o tipo genérico <Point> na coleção**
    const points: Point[] = await db
      .collection<Point>('points') // Adiciona o tipo genérico Point
      .find(query)
      .skip(skip)
      .limit(limit)
      .toArray();

    console.log('Pontos retornados do banco de dados:', points);

    const totalPoints = await db.collection('points').countDocuments(query);
    const totalPages = Math.ceil(totalPoints / limit);

    return NextResponse.json({ points, totalPages });
  } catch (error) {
    console.error('Erro ao conectar com o MongoDB:', error);
    return NextResponse.json(
      { error: 'Erro ao carregar os pontos turísticos' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { title, description, videoId, tags, imageUrl, latitude, longitude } = await request.json();

    // Validação dos campos obrigatórios
    if (!title || !description || !videoId || !imageUrl) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
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
    const result: InsertOneResult<Document> = await db.collection('points').insertOne(newPoint);

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
