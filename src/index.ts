import express, { Request, Response } from 'express';
import supabase from './superbaseClient';  // Import the Supabase client
import cors from 'cors'; 

const app = express();
const port = 3000;

app.use(cors());

// GET endpoint to fetch data from Supabase table
app.get('/api/projects', async (req: Request, res: Response) => {
  try {
    // Fetch data from the 'products' table
    const { data, error } = await supabase
      .from('projects')  // The table you want to query
      .select('*');      // Select all columns

    if (error) {
      res.status(400).json({ message: 'Error fetching data', error });
    } else {
      res.status(200).json(data);
    }
  } catch (err) {
    res.status(500).json({ message: 'Internal server error', error: err });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
