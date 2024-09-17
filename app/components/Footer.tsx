import { Button } from '@/components/ui/button';

const Footer = () => (
  <footer className="border-t bg-background text-foreground">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row items-center justify-between">
      <div className="text-center md:text-left">
        <p className="text-sm">
          © 2024 Jandira Cultural. Todos os direitos reservados.
        </p>
      </div>
      <div className="flex items-center space-x-4 mt-4 md:mt-0">
        <Button variant="ghost" size="icon">
          {/* Ícone do Facebook */}
        </Button>
        <Button variant="ghost" size="icon">
          {/* Ícone do Instagram */}
        </Button>
        <Button variant="ghost" size="icon">
          {/* Ícone do Twitter */}
        </Button>
      </div>
    </div>
  </footer>
);

export default Footer;
