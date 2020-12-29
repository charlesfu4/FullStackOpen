const mongoose = require('mongoose')

const phoneBookSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Phone = mongoose.model('Phonebook', phoneBookSchema)



const password = process.argv[2]

const url = 
`mongodb+srv://fullstack:${password}@cluster0.y8jrq.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

if (process.argv.length === 3) {
  Phone.find({}).then(result =>{
    console.log("Phonebook:")
    result.forEach(phoneData =>{
      console.log(`${phoneData.name} ${phoneData.number}`)
    })
    mongoose.connection.close()
  })
}

else if(process.argv.length === 5){
  const phoneData = new Phone({
    name: process.argv[3],
    number: process.argv[4]
  })

  phoneData.save().then(result => {
    console.log(`added ${result.name} number ${result.number} to the phonebook`)
    mongoose.connection.close()
  })
}
