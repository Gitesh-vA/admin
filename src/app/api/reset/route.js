import { MongoClient } from 'mongodb';

export async function POST(req, res) {
  const client = new MongoClient(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    const data = await req.json();
    await client.connect();
    const database = client.db('adminApp'); // Choose a name for your database 
    const collection = database.collection('adminInfo'); // Choose a name for your collection 

    const user = await collection.findOneAndUpdate(
        { user: data.email }, // Query criteria
        { $set: { password: data.retypePassword } }, // Update data
        { returnOriginal: false } // Options to return the updated document
      );
      
    
    console.log('coming', user)

    return Response.json({ message: 'Data saved successfully!' });
  } catch (error) {
    return Response.json({ message: 'Something went wrong!' });
  } finally {
    await client.close();
  }
}