import express from 'express';
import Database from './Database.js'
import RequestRepository from './RequestRepo.js'

const app = express();
const port = process.env.PORT || 3034;

const db = new Database('./super.db');
const requestRepository = new RequestRepository(db);



// Initialize the database
db.initialize();

// Middleware to parse JSON requests
app.use(express.json());

const verifySessionID = async (sessionID, expectedRole) => {
  let isOK = false
  if (sessionID != '') {
    let sessionFound = await requestRepository.findSessionByID(sessionID)
    console.log ("ses found: ", sessionFound)
    // console.log(sessionFound)
    if (sessionFound != undefined) {
      if (sessionFound.role == expectedRole) {
        return true
      }
    }
  }
  // console.log ( isOK)
  return false
}


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
  
  let isSuc = false
  if (resSignIn.length == 1) {
    if (password==resSignIn[0].password) {
      isSuc = true   
    }
  }
  if (isSuc) {
    let newSessionID = await requestRepository.createSession(resSignIn[0].username, resSignIn[0].role)
      console.log ('created new session id:', newSessionID) 
      res.json({
        name: resSignIn[0].name,
        secondName: resSignIn[0].secondname,
        role: resSignIn[0].role,
        sessionID: newSessionID
      });
  } else {
    res.status(401).json({fail: "что-то не то как-то"})
  }
  // res.json({resSignIn: resSignIn});
 
  // console.log (resSignIn)
})


app.post('/add-request', async (req, res) => {
  try {
    const newReq = req.body;
    const reqId = await requestRepository.createRequest(newReq);

    res.json({ assignedID: reqId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete ('/delete-request', async (req, res) => {
  // console.log (req.body)
  if (verifySessionID(req.body.sessionID, 'admin')){
    try {
      const remID = req.body.ID;
      await requestRepository.deleteRequest(remID);

      res.json({ message: remID });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else {
   
  }
})

app.get ('/request/:id', async (req, res) => {
  let reqID = req.params.id
  let foundReq = await requestRepository.findRequestByID(reqID)
  if (!foundReq) {
    res.status(404).json({mes: 'not found'})
  } else {
    res.json(foundReq)
  }
})

app.put('/request-edit/:id', async (req, res) => {
  try {
    const reqId = req.params.id;
    const updatedReq = req.body;
    console.log(reqId, updatedReq)
    let verif = await verifySessionID(req.body.sessionID, 'admin')
    console.log ('is it ok',verif)
    
    if (verif){
      await requestRepository.updateRequest(reqId, updatedReq.updatedRequest);

      res.json({ message: 'Job updated successfully' });
    } else {
      res.status(400).json({mes: "ну вы самозванец"})
    }


    
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});