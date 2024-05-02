import { MongoClient } from 'mongodb';
import multer from 'multer';

const upload = multer({ dest: 'uploads/' });

export const config = {
    api: {
        bodyParser: false, // Disable body parsing, as we will handle it manually
    },
};

export async function POST(req, res) {
    const client = new MongoClient(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    try {
        upload.single('image')(req, res, async (err) => {
            if (err) {
                console.error('Error uploading image:', err);
                return res.status(400).json({ message: 'Image upload failed' });
            }

            // Get other form data
            console.log(req)
            const { name } = req.body;

            // Save image path to database
            const imagePath = req.file.path;
            await collection.insertOne({ name, imagePath });
            return Response.json({ message: 'Category saved successfully!' });
            })
        } catch (error) {
            console.error(error);
            return Response.json({ message: 'Something went wrong!' });
        } finally {
            await client.close();
        }
    }
