import { MongoClient } from 'mongodb';

// Declaração do tipo da variável global para o MongoClient Promise
declare global {
  // Permite que o uso de _mongoClientPromise em Node.js não cause problemas de redefinição de tipo
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (!process.env.MONGODB_URI) {
  throw new Error('Por favor, adicione sua MONGODB_URI no arquivo .env.local');
}

const uri = process.env.MONGODB_URI;
let client: MongoClient;
let clientPromise: Promise<MongoClient>;

// Lógica de ambiente de desenvolvimento e produção
if (process.env.NODE_ENV === 'development') {
  // Em desenvolvimento, reutilizamos a conexão durante os recarregamentos
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // Em produção, criamos uma nova conexão a cada instância
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export default clientPromise;
