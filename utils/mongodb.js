import { MongoClient } from 'mongodb';

const MONGO_URI = process.env.MONGO_URI;
const options = {};

let client;
let clientPromise;

if (!MONGO_URI) {
  throw new Error('Please add your Mongo URI to .env.local');
}

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so the client is preserved across module reloads
  if (!global._mongoClientPromise) {
    client = new MongoClient(MONGO_URI, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable
  client = new MongoClient(MONGO_URI, options);
  clientPromise = client.connect();
}

export default clientPromise;
