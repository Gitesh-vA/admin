import { MongoClient } from 'mongodb';

export async function GET(req, res) {
  const client = new MongoClient(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    const database = client.db('adminApp'); // Choose a name for your database 
    const collection = database.collection('adminInfo'); // Choose a name for your collection 

    await collection.insertOne({
      user: 'gattu',
      password: '1234'
    });

    return Response.json({ message: 'Data saved successfully!' });
  } catch (error) {
    return Response.json({ message: 'Something went wrong!' });
  } finally {
    await client.close();
  }
}