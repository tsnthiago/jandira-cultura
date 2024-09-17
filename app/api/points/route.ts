// app/api/points/route.ts

import { NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongodb';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    const client = await clientPromise;
    const db = client.db('jandira-cultura');

    const points = await db
      .collection('points')
      .find({})
      .skip(skip)
      .limit(limit)
      .toArray();

    console.log("Pontos retornados do banco de dados:", points);

    const totalPoints = await db.collection('points').countDocuments();
    const totalPages = Math.ceil(totalPoints / limit);

    return NextResponse.json({ points, totalPages });
  } catch (error) {
    console.error("Erro ao conectar com o MongoDB:", error);
    return NextResponse.json({ error: 'Erro ao carregar os pontos turísticos' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { title, description, videoId, imageUrl, tags, latitude, longitude } = data; // Inclui imageUrl, latitude e longitude

    const client = await clientPromise;
    const db = client.db('jandira-cultura');

    const newPoint = {
      title,
      description,
      videoId,
      image: imageUrl,
      tags: tags.split(',').map((tag: string) => tag.trim()),
      location: { lat: latitude, lng: longitude },
      createdAt: new Date(),
    };

    const result = await db.collection('points').insertOne(newPoint);
    return NextResponse.json({ message: 'Ponto turístico adicionado com sucesso!', result }, { status: 201 });
  } catch (error) {
    console.error("Erro ao inserir ponto turístico:", error);
    return NextResponse.json({ error: 'Erro ao adicionar o ponto turístico' }, { status: 500 });
  }
}
