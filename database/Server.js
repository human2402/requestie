import express from 'express';
import Database from './Database.js'
import RequestRepository from './RequestRepo.js'
import { AiOutlineOneToOne } from 'react-icons/ai';

const app = express();
const port = process.env.PORT || 3033;

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




app.post ('/sign-in', async (req, res) => {
  const username = req.body.username
  const password = req.body.password
  const resSignIn = await requestRepository.getUserByUsernameWithPass(username, password)
  if (resSignIn.length == 1) {
    if (password==resSignIn[0].password) {
      let newSessionID = await requestRepository.createSession(resSignIn[0].username, resSignIn[0].role)
      console.log ('created new session id:', newSessionID) 
      res.json({
        name: resSignIn[0].name,
        role: resSignIn[0].role,
        sessionID: newSessionID
      });
    }
  }
  // res.json({resSignIn: resSignIn});
  res.status(500)
  console.log (resSignIn)
})


app.post('/add-request', async (req, res) => {
  try {
    const newReq = req.body;
    const reqId = await requestRepository.createRequest(newJob);

    res.json({ message: 'Request created successfully', id: requestID });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});