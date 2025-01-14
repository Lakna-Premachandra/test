import express, { Request, Response } from 'express';
import supabase from './superbaseClient';  // Import the Supabase client
import cors from 'cors'; 

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());  // Make sure to add middleware to handle JSON bodies

// GET endpoint to fetch data from Supabase table
app.get('/api/projects', async (req: Request, res: Response) => {
  try {
    // Fetch data from the 'products' table
    const { data, error } = await supabase
    .rpc('get_project_details'); //call sp

    if (error) {
      res.status(400).json({ message: 'Error fetching data', error });
    } else {
      res.status(200).json(data);
    }
  } catch (err) {
    res.status(500).json({ message: 'Internal server error', error: err });
  }
});

app.post('/api/addProject', async (req: any, res: any) => {
  try {
    const {
      projecttitle,
      projectsummary,
      projectdescription,
      categoryid, 
      startdate,
      enddate,
      priorityid,
      statusid
    } = req.body;

    // // Validate required fields
    // if (!ProjectTitle || !StartDate || !EndDate) {
    //   return res.status(400).json({ message: 'Missing required fields' });
    // }

    // Insert data into the 'projects' table in Supabase
    const { data, error } = await supabase
      .from('projects')
      .insert([
        {
          projecttitle,
          projectsummary,
          projectdescription,
          categoryid, 
          startdate,
          enddate,
          priorityid,
          statusid
        },
      ]);

    // Check for errors during insertion
    if (error) {
      return res.status(400).json({ message: 'Error inserting data', error });
    }

    // Return the inserted data as a response
    return res.status(201).json(data);

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error', error: err });
  }
});


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
