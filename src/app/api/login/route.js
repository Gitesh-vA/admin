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
    
    const user = await collection.findOne({
      user: data.name
    });

    if(user.user == data.name && user.password == data.password){
      return Response.json({ message: 'User Logged in successfully!', token: '#1234' });
    }else{
      return Response.json({ message: 'Wrong Credentials!' });
    }
    
  } catch (error) {
    console.error(error);
    return Response.json({ message: 'Something went wrong!' });
  } finally {
    await client.close();
  }
}
