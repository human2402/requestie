import express from 'express';
import Database from './Database.js'
import RequestRepository from './RequestRepo.js'

const app = express();
const port = process.env.PORT || 3031;

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
    const structuredResponse = {
      pending:[],
      inprogress:[],
      completed:[]
    }
    requests.forEach(element => {
      // console.log (element.id)
      switch(element.status) {
        case "Pending":
          structuredResponse.pending.push(element)
          break;
        case "In Progress":
          structuredResponse.inprogress.push(element)
          break;
        case 'Completed':
          structuredResponse.completed.push(element)
          break;
      }
    });
  // console.log (structuredResponse)
    res.json(structuredResponse);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});