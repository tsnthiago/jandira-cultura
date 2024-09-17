// app/api/addPoint/route.ts

import { NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongodb';

const extractYouTubeId = (url: string): string | null => {
  const regex =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

export async function POST(request: Request) {
  const { title, description, videoUrl, tags } = await request.json();

  const extractedVideoId = extractYouTubeId(videoUrl);

  if (!title || !description || !extractedVideoId) {
    return NextResponse.json(
      {
        message:
          'Preencha todos os campos corretamente e insira um ID de vídeo válido!',
      },
      { status: 400 }
    );
  }

  try {
    const client = await clientPromise;
    const db = client.db('jandira-cultura');

    const newPoint = {
      title,
      description,
      videoId: extractedVideoId,
      tags: tags.split(',').map((tag: string) => tag.trim()),
      createdAt: new Date(),
    };

    const result = await db.collection('points').insertOne(newPoint);
    return NextResponse.json(
      { message: 'Ponto turístico adicionado com sucesso!', result },
      { status: 201 }
    );
  } catch (error) {
    console.error('Erro ao inserir ponto turístico:', error);
    return NextResponse.json(
      { error: 'Erro ao adicionar o ponto turístico' },
      { status: 500 }
    );
  }
}
