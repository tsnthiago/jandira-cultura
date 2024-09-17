'use client';

import React from 'react';
import { Modal, Button, ModalFooter, ModalContent, ModalHeader, ModalBody } from '@nextui-org/react';
import { Download, Share2, Tag } from 'lucide-react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { cn } from '@/lib/utils';

// Importação dinâmica do MapComponent
const MapComponentNoSSR = dynamic(() => import('./MapComponent'), {
  ssr: false,
  loading: () => <p>Carregando mapa...</p>, // Fallback ao carregar dinamicamente
});

// Definição da interface para os props do Modal
interface DetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPoint: Point | null;
  handleDownload: (point: Point) => void;
  handleShare: (point: Point) => void;
}

// Interface para definir o tipo de Point
interface Point {
  _id: string;
  title: string;
  image: string;
  description: string;
  videoId: string;
  tags: string[];
  createdAt: string;
  location?: { lat: number; lng: number };
}

const DetailModal: React.FC<DetailModalProps> = ({
  isOpen,
  onClose,
  selectedPoint,
  handleDownload,
  handleShare,
}) => {
  // Verificação para garantir que selectedPoint não seja null antes de renderizar o modal
  if (!selectedPoint) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>
          <h2 className="text-2xl font-bold text-foreground">
            {selectedPoint.title}
          </h2>
        </ModalHeader>
        <ModalBody>
          <div className="space-y-4">
            {/* Imagem */}
            <div className="relative w-full h-64 rounded-md overflow-hidden">
              {selectedPoint.image ? (
                <Image
                  src={selectedPoint.image}
                  alt={`Imagem de ${selectedPoint.title}`}
                  fill
                  sizes="100vw"
                  style={{ objectFit: 'cover' }}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = 'placeholder.jpg';
                  }}
                />
              ) : (
                <div className="w-full h-full bg-gray-300 rounded-t-md flex items-center justify-center">
                  <span className="text-gray-500">Imagem não disponível</span>
                </div>
              )}
            </div>

            {/* Descrição */}
            <p className="text-foreground">
              {selectedPoint.description}
            </p>

            {/* Vídeo */}
            <div className="aspect-video mt-4 rounded-md overflow-hidden">
              {selectedPoint.videoId ? (
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${selectedPoint.videoId}`}
                  title={`Vídeo de ${selectedPoint.title}`}
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <div className="w-full h-full bg-gray-300 flex items-center justify-center rounded-md">
                  <span className="text-gray-500">Vídeo não disponível</span>
                </div>
              )}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-4">
              {selectedPoint.tags.map((tag) => (
                <span
                  key={tag}
                  className={cn(
                    'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold border transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
                    'dark:bg-secondary dark:text-secondary-foreground dark:hover:bg-secondary/80' // Adicione classes para o modo escuro
                  )}
                >
                  <Tag className="mr-1 h-3 w-3" />
                  {tag}
                </span>
              ))}
            </div>

            {/* Localização */}
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Localização</h3>
              <div className="h-64 rounded-md overflow-hidden">
                {selectedPoint.location ? (
                  <MapComponentNoSSR
                    lat={selectedPoint.location.lat}
                    lng={selectedPoint.location.lng}
                    title={selectedPoint.title}
                  />
                ) : (
                  <p className="text-center text-gray-500">
                    Localização não disponível.
                  </p>
                )}
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter className="flex justify-center space-x-4">
          <Button color="danger" variant="light" onClick={onClose}>
            Fechar
          </Button>
          {selectedPoint && (
            <>
              <Button color="primary" variant="flat" onClick={() => handleDownload(selectedPoint)}>
                <Download className="mr-2 h-4 w-4" />
                Baixar Informações
              </Button>
              <Button color="secondary" variant="flat" onClick={() => handleShare(selectedPoint)}>
                <Share2 className="mr-2 h-4 w-4" />
                Compartilhar Localização
              </Button>
            </>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DetailModal;