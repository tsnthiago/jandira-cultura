import React from 'react';
import { Button } from '@/components/ui/button';

const Header = () => (
  <header className="bg-background text-foreground">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
      <h1 className="text-lg font-bold">Jandira Cultura</h1>
      <Button variant="outline">Login</Button>
    </div>
  </header>
);

export default Header;
