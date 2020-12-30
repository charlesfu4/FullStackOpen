require('dotenv').config()
const express = require('express')
const dateformat = require('dateformat')
const morgan = require('morgan')
const app = express()
const Person = require('./models/person') 

app.use(express.json())
app.use(express.static('build'))

morgan.token('body', req => JSON.stringify(req.body))

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))


// GET all persons ex3.1
app.get('/api/persons', (req, res, next) =>{
  Person.find({}).then(phoneData =>{
    res.json(phoneData)
  })
  .catch(error=>{next(error)})
})

app.get('/info', (req, res, next) => {
  Person.count({}, (error, count) =>{
    const time = new Date()
    res.send(`Phone book has info of ${count} people.<br>`+ 
    dateformat(time, 'dddd mmmm dS yyyy h:MM:ss TT Z'))
  }) 
  .catch(error=>{next(error)})
})

app.get('/api/persons/:id', (req, res, next) =>{
  Person.findById(req.params.id)
  .then(phoneData=>{
    if(phoneData) res.json(phoneData)
    else res.status(404).end()
  })
  .catch(error=>(next(error)))
})

// DELETE persons by id ex3.4
app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
  .then(result=>{
    res.status(204).end()
  })
  .catch(error=>{next(error)})
})


// name already exists
app.put('/api/persons/:id', (req, res, next) =>{
  const body = req.body
  const person = {
    name : body.name,
    number : body.number
  }
  
  Person.findByIdAndUpdate(req.params.id, person, {new:true})
  .then(updatedPerson =>{
    res.json(updatedPerson)
  })
  .catch(error=>{next(error)})
})

// new name
app.post('/api/persons', (req, res) => {
  const body = req.body
  if(!body.name || !body.number){
    return res.status(400).json({
      error: 'content missing'
    })
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save().then(savePerson =>{
    res.json(savePerson)
  })

})

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

// handler of requests with unknown endpoint
app.use(unknownEndpoint)

const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT 
app.listen(PORT, () =>{
  console.log(`Server is running on ${PORT}`)
})

