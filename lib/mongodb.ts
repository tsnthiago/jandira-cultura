import { MongoClient } from 'mongodb';

// Declaração do tipo da variável global
declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (!process.env.MONGODB_URI) {
  throw new Error('Por favor, adicione sua MONGODB_URI no arquivo .env.local');
}

const uri = process.env.MONGODB_URI;
let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  // Em desenvolvimento, use uma conexão global para reutilizar entre reloads
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // Em produção, crie uma nova conexão a cada request
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export default clientPromise;
