import { MongoClient } from 'mongodb';

export async function GET(req, res) {
  const client = new MongoClient(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    
    await client.connect();
    const database = client.db('adminApp'); // Choose a name for your database 
    const collection = database.collection('category'); // Choose a name for your collection 
    
    const cursor = await collection.find({})
    const categories = await cursor.toArray();

    return Response.json({ message: 'Category fetched successfully!', data: categories });

  } catch (error) {
    console.error(error);
    return Response.json({ message: 'Something went wrong!' });
  } finally {
    await client.close();
  }
}
