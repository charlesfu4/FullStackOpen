const express = require('express')
const dateformat = require('dateformat')
const morgan = require('morgan')
const app = express()

app.use(express.json())
app.use(express.static('build'))

morgan.token('body', req => JSON.stringify(req.body))

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))


let persons = [
  { 
    name: "Arto Hellas", 
    number: "040-123456",
    id: 1
  },
  { 
    name: "Ada Lovelace", 
    number: "39-44-5323523",
    id: 2
  },
  { 
    name: "Dan Abramov", 
    number: "12-43-234345",
    id: 3
  },
  { 
    name: "Mary Poppendieck", 
    number: "39-23-6423122",
    id: 4
  }
]

console.log("Hello World")

// GET all persons ex3.1
app.get('/api/persons', (request, response) =>{
  response.json(persons)
})

// GET information ex3.2
app.get('/info', (request, response) => {
  const info = persons.length 
  const time = new Date()
  response.send(`Phone book has info of ${info} people.<br>`+ 
  dateformat(time, 'dddd mmmm dS yyyy h:MM:ss TT Z'))
})
// GET person by id ex3.3
app.get('/api/persons/:id', (req, res) =>{
  const id = Number(req.params.id)
  console.log(id)
  const person = persons.find(p => p.id === id) 

  if(person)
    res.json(person)
  else
    res.status(404).end()
})

// DELETE persons by id ex3.4
app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(p => p.id !== id)

  res.status(204).end()
})

// POST new person ex3.5-3.6
const getRandomId = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
}

app.post('/api/persons', (req, res) => {
  const body = req.body
  console.log(body)
  // name or number is missing
  if(!body.name || !body.number){
    return res.status(400).json({
      error: 'content missing'
    })
  }
  // name already exists
  if(persons.find(p => p.name === body.name)){
    return res.status(400).json({
      error: 'name repeated!'
    })
  }
  const person = {
    name: body.name,
    number: body.number,
    id: getRandomId(99999),
  }

  persons = persons.concat(person)

  res.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () =>{
  console.log(`Server is running on ${PORT}`)
})

