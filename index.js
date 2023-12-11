const express = require("express")
var morgan = require('morgan')
const cors = require('cors')
const app = express()

let data = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]
app.use(express.json())


app.use(cors())
app.use(morgan("':method :url :status :res[content-length] - :response-time ms'"))
app.get("/api/persons", (request,response) => {
  response.json(data)
})

app.get("/info", (request,response) => {
  let html  = `<p>Phonebook has info for ${data.length} people <br/> ${Date(Date.now())} </p>`
  response.send(html)
})

app.get("/api/persons/:id", (request,response) => {
  let id = Number(request.params.id)
  let newData = data.find((val) => {
    return id === val.id
  })
  console.log(newData)
  if(newData) {
    response.json(newData)

  }else {
    response.status(404).end()
  }
})

app.delete("/api/persons/:id", (request,response) => {
  let id = Number(request.params.id)
  data = data.filter((val) => {
    return id !== val.id
  })
  response.status(204).end()

})

function generateID() {
  return Math.ceil(Math.random() * 10000)
}

app.post("/api/persons", (request,response) => {
  
  const body = request.body
  const person = {
    id: generateID(),
    name: body.name,
    number: body.number
  }
  
  data.push(person)
  
  response.json(data)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})