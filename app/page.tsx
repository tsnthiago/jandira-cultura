// ./app/page.tsx

'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import Image from 'next/image';
import { ChevronRight, MapPin, Tag, Menu, Search, Home, Info, Mail, Download, Share2 } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import { toast } from 'react-hot-toast';
import PointCard from './components/PointCard';

// Importação dinâmica do componente de mapa sem SSR
const MapComponentNoSSR = dynamic(() => import('./components/MapComponent'), {
  ssr: false,
  loading: () => <p>Carregando mapa...</p>
});

// Animações para o Framer Motion
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } }
};

const slideIn = {
  hidden: { x: -20 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.5 } }
};

export default function JandiraCultural() {
  // Atualizado o tipo de estado para remover "events" e "admin"
  const [activeTab, setActiveTab] = useState<"home" | "points" | "about" | "contact">("home");

  // Estado para controle de modo escuro/claro
  const [darkMode, setDarkMode] = useState(false);

  // Estado para armazenar o ponto selecionado para detalhes
  const [selectedPoint, setSelectedPoint] = useState<any>(null);

  // Estado para armazenar os pontos turísticos
  const [points, setPoints] = useState<any[]>([]);

  // Estado para controle de carregamento
  const [loading, setLoading] = useState(true);

  // Estado para a consulta de pesquisa
  const [searchQuery, setSearchQuery] = useState('');

  // Hook do NextUI para controle de modal
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Filtrar os pontos com base na consulta de pesquisa
  const filteredPoints = points.filter(point =>
    point.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    point.tags.some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Efeito para alternar entre modo escuro e claro
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      toast.success("Modo escuro ativado!");
    } else {
      document.documentElement.classList.remove('dark');
      toast.success("Modo claro ativado!");
    }
  }, [darkMode]);

  // Efeito para buscar os pontos turísticos ao montar o componente
  useEffect(() => {
    const fetchPoints = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/points?page=1&limit=100`);
        if (!response.ok) throw new Error('Erro ao buscar os pontos de interesse.');

        const data = await response.json();
        setPoints(data.points);
      } catch (error) {
        console.error("Erro ao carregar os pontos turísticos:", error);
        toast.error("Erro ao carregar os pontos turísticos.");
      } finally {
        setLoading(false);
      }
    };

    fetchPoints();
  }, []);

  // Função para alternar o modo escuro/claro
  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  // Função para abrir o modal com detalhes do ponto
  const openPointDetails = (point: any) => {
    setSelectedPoint(point);
    onOpen();
  };

  // Função para baixar informações do ponto
  const handleDownload = (point: any) => {
    if (!point.location) {
      toast.error("Localização não disponível para este ponto.");
      return;
    }
    const data = `
      Título: ${point.title}
      Descrição: ${point.description}
      Tags: ${point.tags?.join(', ') || 'Sem tags'}
      Localização: Latitude ${point.location?.lat || 'N/A'}, Longitude ${point.location?.lng || 'N/A'}
      Vídeo: https://www.youtube.com/watch?v=${point.videoId || 'N/A'}
    `;
    const blob = new Blob([data], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${point.title.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Função para compartilhar localização do ponto
  const handleShare = (point: any) => {
    if (navigator.share) {
      navigator.share({
        title: point.title,
        text: point.description,
        url: `https://maps.google.com/?q=${point.location.lat},${point.location.lng}`
      }).catch(err => console.error("Erro ao compartilhar:", err));
    } else {
      alert(`Compartilhe este local: https://maps.google.com/?q=${point.location.lat},${point.location.lng}`);
    }
  };

  // Função para renderizar o conteúdo com base na aba ativa
  const renderContent = (filteredPoints: any[]) => {
    if (loading) {
      return <p>Carregando pontos...</p>;
    }

    switch (activeTab) {
      case "home":
        return (
          <motion.div className="space-y-8" initial="hidden" animate="visible" exit="hidden" variants={fadeIn}>
            {/* Seção de Destaques na Página Inicial */}
            <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32 relative min-h-[400px]">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPoints.map((point, index) => (
                  <PointCard key={point._id} point={point} onClick={function (): void {
                    throw new Error('Function not implemented.');
                  }} />
                ))}
              </div>
              <div
                className="absolute inset-0 bg-cover bg-center z-[-1]"
                style={{ backgroundImage: "url('/background.jpg')" }}
              ></div>
              <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-4 text-center relative z-10 bg-white bg-opacity-80 py-10"> {/* Opacidade para o container do texto */}
                <motion.h1
                  className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold"
                  variants={slideIn}
                >
                  Descubra Jandira
                </motion.h1>
                <motion.p
                  className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8"
                  variants={fadeIn}
                >
                  Explore os tesouros culturais da nossa cidade. De parques exuberantes a teatros vibrantes, Jandira tem algo para todos.
                </motion.p>
                <motion.div variants={fadeIn}>
                  <Button size="lg" onClick={() => setActiveTab("points")}>
                    Explorar Pontos de Interesse
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </motion.div>
              </div>
            </section>

            {/* Seção de Destaques */}
            <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-4 text-center">
                <motion.h2
                  className="font-heading text-3xl sm:text-4xl font-bold"
                  variants={slideIn}
                >
                  Destaques
                </motion.h2>
                <motion.p
                  className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8"
                  variants={fadeIn}
                >
                  Conheça alguns dos lugares mais amados de Jandira
                </motion.p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPoints.map((point, index) => (
                  <motion.div
                    key={point._id}
                    variants={fadeIn}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                      {/* Verificação da URL da imagem e imagem de fallback */}
                      {point.image ? (
                        <img
                          src={point.image}
                          alt={point.title}
                          className="w-full h-48 object-cover rounded-t-md"
                          onError={(e) => {
                            e.currentTarget.src = "placeholder.jpg"; // Substitua por uma URL válida para sua imagem de fallback
                          }}
                        />
                      ) : (
                        <div className="w-full h-48 bg-gray-300 rounded-t-md flex items-center justify-center">
                          <span className="text-gray-500">Imagem não disponível</span>
                        </div>
                      )}
                      <CardHeader>
                        <CardTitle>{point.title}</CardTitle>
                        <CardDescription>{point.description.substring(0, 100)}...</CardDescription>
                      </CardHeader>
                      <CardFooter>
                        <Button variant="outline" className="w-full" onClick={() => openPointDetails(point)}>
                          Saiba mais
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </section>
          </motion.div>
        );
      case "points":
        return (
          <motion.div className="space-y-8" initial="hidden" animate="visible" exit="hidden" variants={fadeIn}>
            <motion.h2
              className="font-heading text-3xl sm:text-4xl font-bold mb-6"
              variants={slideIn}
            >
              Pontos de Interesse
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPoints.map((point, index) => (
                <motion.div
                  key={point._id}
                  variants={fadeIn}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    <img
                      src={point.image}
                      alt={point.title}
                      className="w-full h-48 object-cover rounded-t-md"
                      onError={(e) => {
                        e.currentTarget.src = "placeholder.jpg"; // Substituição de imagem de fallback
                      }}
                    />
                    <CardHeader>
                      <CardTitle>{point.title}</CardTitle>
                      <CardDescription>{point.description.substring(0, 100)}...</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {point.tags.map((tag: string) => (
                          <span key={tag} className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
                            <Tag className="mr-1 h-3 w-3" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full" onClick={() => openPointDetails(point)}>
                        Ver Detalhes
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        );
      case "about":
        return (
          <motion.div className="space-y-8" initial="hidden" animate="visible" exit="hidden" variants={fadeIn}>
            <motion.h2
              className="font-heading text-3xl sm:text-4xl font-bold mb-6"
              variants={slideIn}
            >
              Sobre o Jandira Cultural
            </motion.h2>
            <motion.div variants={fadeIn}>
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle>Nossa Missão</CardTitle>
                  <CardDescription>Conheça mais sobre nossa história e objetivos</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">O projeto Jandira Cultural nasceu da paixão por nossa cidade e do desejo de compartilhar suas riquezas culturais com moradores e visitantes. Nossa missão é proporcionar uma plataforma interativa e informativa que destaque os pontos turísticos, eventos culturais e a história rica de Jandira.</p>
                  <p className="mb-4">Através deste projeto, buscamos:</p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Promover o turismo local e incentivar a exploração da cidade</li>
                    <li>Preservar e divulgar a história e cultura de Jandira</li>
                    <li>Conectar a comunidade com os espaços culturais e eventos locais</li>
                    <li>Oferecer uma plataforma para artistas e produtores culturais da região</li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        );
      case "contact":
        return (
          <motion.div className="space-y-8" initial="hidden" animate="visible" exit="hidden" variants={fadeIn}>
            <motion.h2
              className="font-heading text-3xl sm:text-4xl font-bold mb-6"
              variants={slideIn}
            >
              Entre em Contato
            </motion.h2>
            <motion.div variants={fadeIn}>
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle>Envie-nos uma mensagem</CardTitle>
                  <CardDescription>Estamos aqui para ouvir suas sugestões e feedback</CardDescription>
                </CardHeader>
                <CardContent>
                  <form
                    className="space-y-4"
                    onSubmit={async (e) => {
                      e.preventDefault();
                      toast.success("Mensagem enviada com sucesso!");
                    }}
                  >
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome</Label>
                      <Input id="name" placeholder="Seu nome" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">E-mail</Label>
                      <Input id="email" type="email" placeholder="seu@email.com" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Mensagem</Label>
                      <Textarea id="message" placeholder="Sua mensagem ou sugestão" required />
                    </div>
                    <Button type="submit" className="w-full">Enviar Mensagem</Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      className={`min-h-screen bg-background text-foreground flex flex-col`}
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      {/* Cabeçalho */}
      <motion.header
        className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
        variants={slideIn}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
          <div className="flex items-center gap-6 md:gap-10">
            {/* Logo e Título */}
            <div className="flex items-center">
              <Image
                src="/jandira-logo.jpg"
                alt="Logo da Cidade de Jandira"
                width={40}
                height={40}
                className="mr-3"
              />
              <motion.h1
                className="text-2xl font-bold"
                variants={fadeIn}
              >
                Jandira Cultural
              </motion.h1>
            </div>
            {/* Menu Desktop */}
            <nav className="hidden md:flex space-x-4">
              <Button variant="ghost" onClick={() => setActiveTab("home")}>Início</Button>
              <Button variant="ghost" onClick={() => setActiveTab("points")}>Pontos de Interesse</Button>
              <Button variant="ghost" onClick={() => setActiveTab("about")}>Sobre</Button>
              <Button variant="ghost" onClick={() => setActiveTab("contact")}>Contato</Button>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            {/* Campo de Pesquisa */}
            <Input
              type="text"
              placeholder="Pesquisar..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="hidden md:block"
            />
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
            </Button>
            {/* Removido o ícone de notificações */}
            {/* Removido o botão "Entrar" */}
            {/* Menu Mobile (Sheet) */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                  <SheetDescription>Navegue pelo Jandira Cultural</SheetDescription>
                </SheetHeader>
                <nav className="flex flex-col space-y-4 mt-6">
                  <Button variant="ghost" onClick={() => setActiveTab("home")}>
                    <Home className="mr-2 h-4 w-4" />
                    Início
                  </Button>
                  <Button variant="ghost" onClick={() => setActiveTab("points")}>
                    <MapPin className="mr-2 h-4 w-4" />
                    Pontos de Interesse
                  </Button>
                  {/* Removido o botão "Eventos" */}
                  <Button variant="ghost" onClick={() => setActiveTab("about")}>
                    <Info className="mr-2 h-4 w-4" />
                    Sobre
                  </Button>
                  <Button variant="ghost" onClick={() => setActiveTab("contact")}>
                    <Mail className="mr-2 h-4 w-4" />
                    Contato
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </motion.header>

      {/* Conteúdo Principal */}
      <motion.main
        className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8"
        variants={fadeIn}
      >
        <AnimatePresence mode="wait">
          {renderContent(filteredPoints)} {/* Passar filteredPoints para a função de renderização */}
        </AnimatePresence>
      </motion.main>

      {/* Rodapé */}
      <motion.footer
        className="border-t mt-12"
        variants={slideIn}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row items-center justify-between">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <p className="text-sm text-muted-foreground">
              © 2024 Jandira Cultural. Todos os direitos reservados.
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              {/* Ícone do Facebook */}
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
              <span className="sr-only">Facebook</span>
            </Button>
            <Button variant="ghost" size="icon">
              {/* Ícone do Instagram */}
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
              <span className="sr-only">Instagram</span>
            </Button>
            <Button variant="ghost" size="icon">
              {/* Ícone do Twitter */}
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter">
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
              </svg>
              <span className="sr-only">Twitter</span>
            </Button>
          </div>
        </div>
      </motion.footer>

      {/* Modal de Detalhes do Ponto Turístico */}
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        scrollBehavior="inside"
        size="3xl"
        classNames={{
          base: "bg-background border border-border shadow-lg",
          header: "border-b border-border",
          body: "py-6",
          footer: "border-t border-border"
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-foreground">
                {selectedPoint?.title}
              </ModalHeader>
              <ModalBody>
                <div className="space-y-4">
                  {/* Verificação da URL da imagem e imagem de fallback */}
                  {selectedPoint?.image ? (
                    <img
                      src={selectedPoint?.image}
                      alt={selectedPoint?.title}
                      className="w-full h-48 object-cover rounded-t-md"
                      onError={(e) => {
                        e.currentTarget.src = "placeholder.jpg"; // Correção: remove a barra "/"
                      }}
                    />
                  ) : (
                    <div className="w-full h-48 bg-gray-300 rounded-t-md flex items-center justify-center">
                      <span className="text-gray-500">Imagem não disponível</span>
                    </div>
                  )}
                  <p className="text-foreground">{selectedPoint?.description}</p>
                  <div className="aspect-video mt-4">
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${selectedPoint?.videoId}`}
                      title={selectedPoint?.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {selectedPoint?.tags.map((tag: string) => (
                      <span key={tag} className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
                        <Tag className="mr-1 h-3 w-3" />
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold mb-2">Localização</h3>
                    <div className="h-64 rounded-md overflow-hidden">
                      {selectedPoint && selectedPoint.location && (
                        <MapComponentNoSSR
                          lat={selectedPoint.location.lat}
                          lng={selectedPoint.location.lng}
                          title={selectedPoint.title}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter className="flex justify-center space-x-4">
                <Button variant="outline" onClick={onClose}>
                  Fechar
                </Button>
                <Button variant="default" onClick={() => handleDownload(selectedPoint)}>
                  <Download className="mr-2 h-4 w-4" />
                  Baixar Informações
                </Button>
                <Button variant="secondary" onClick={() => handleShare(selectedPoint)}>
                  <Share2 className="mr-2 h-4 w-4" />
                  Compartilhar Localização
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </motion.div>
  );
}
