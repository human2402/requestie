import express from 'express';
import Database from './Database.js'
import RequestRepository from './RequestRepo.js'

const app = express();
const port = process.env.PORT || 3030;

const db = new Database('./super.db');
const requestRepository = new RequestRepository(db);

// Initialize the database
db.initialize();

// Middleware to parse JSON requests
app.use(express.json());

app.get('/requests', async (req, res) => {
  try {
    const limit = parseInt(req.query._limit) || null;
    const requests = await requestRepository.getAllRequests(limit);

//    const structuredResponse = jobs.map(job => ({
//      id: job.id,
//      title: job.title,
//      type: job.type,
//      location: job.location,
//      description: job.description,
//      salary: job.salary,
//      company: {
//        name: job.company_name,
//        description: job.company_description,
//        contactEmail: job.contact_email,
//        contactPhone: job.contact_phone
//      }
//    }));

    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});