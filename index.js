const express = require('express')
const app = express()
const port = 3000

const USERS = [];

const ADMINS = [];

const QUESTIONS = [{
    title: "Two states",
    description: "Given an array , return the maximum of the array?",
    testCases: [{
        input: "[1,2,3,4,5]",
        output: "5"
    }]
}];


const SUBMISSIONS = [

]

app.use(express.json())

app.post('/signup', function(req, res) {
  // Add logic to decode body
  // body should have email and password
  const {email, password} = req.body
  
  const loggedUser = USERS.find(user => user.email === email)
  if (loggedUser) {
    res.status(400).json('You already have an account')
  }

  //Store email and password (as is for now) in the USERS array above (only if the user with the given email doesnt exist)
  USERS.push({email,password})
  res.status(200).send(`Hello World!`)
  // return back 200 status code to the client
  
})


app.post('/login', function(req, res) {
  // Add logic to decode body
  // body should have email and password
  const { email,password } = req.body
  
    // Check if the user with the given email exists in the USERS array
    // Also ensure that the password is the same
  const loggedUser = USERS.find(user => user.email === email)

  const token = generateToken()

  if (loggedUser && loggedUser.password === password) {
    res.status(200).json({msg:"login successful!! hello world from route 2", token:token})
  }else{
    res.status(401).json({msg:"Error!!Incorrect password or email"})
  }
  // Check if the user with the given email exists in the USERS array
  // Also ensure that the password is the same
  function generateToken() {
    const tokenLength = 32;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    for (let i = 0; i < tokenLength; i++) {
      token += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return token;
  }
  
  // If the password is the same, return back 200 status code to the client
  // Also send back a token (any random string will do for now)
  // If the password is not the same, return back 401 status code to the client
  
})

app.get('/questions', function(req, res) {

  //return the user all the questions in the QUESTIONS array
  res.send("Hello World from route 3!")
})

app.get("/submissions", function(req, res) {
   // return the users submissions for this problem
  res.send("Hello World from route 4!")
});


app.post("/submissions", function(req, res) {
   // let the user submit a problem, randomly accept or reject the solution
   // Store the submission in the SUBMISSION array above
  const {submitted} = req.body
  const value = Math.random()

  if(value<0.5){
      res.send("submission accepted")
  }else{
      res.send("submission rejectd.try again!!")
  }
  SUBMISSIONS.push(submitted)
    
  res.send("Hello World from route 4!")
});

// leaving as hard todos
// Create a route that lets an admin add a new problem
// ensure that only admins can do that.
app.post("/add/:adminId",(req,res)=>{
    const {adminId} = req.params
    const {question} = req.body

    const admins = ADMINS.find(admin => admin.id === adminId)

    if (admins) {
        QUESTIONS.push(question)
        res.status(200).send("Question added successfully!!")
    }else{
        res.status(404).send("Access Denied!!")
    }
})

app.listen(port, function() {
  console.log(`Example app listening on port ${port}`)
})
