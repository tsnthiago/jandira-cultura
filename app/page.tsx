import Header from '../app/components/Header';
import Footer from '../app/components/Footer';

export default function Home() {
  return (
    <div>
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <h1 className="text-4xl font-bold">Bem-vindo ao Jandira Cultura</h1>
        <p className="mt-4 text-lg">
          Descubra os pontos turísticos, culturais, parques, praças e teatros da cidade de Jandira.
        </p>
      </main>
      <Footer />
    </div>
  );
}
